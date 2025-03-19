// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Farm-Based DeFi Staking Protocol
 * @dev This contract allows users to stake tokens in specific farms and earn rewards based on farm APY.
 */
contract FarmBasedDeFiStakingProtocol {
    // Constants
    address constant SUSTAINABLE_POOL_ADDRESS =
        0x1B02525C23130f4f64D6d86a41e916b70e5E03aA;
    uint256 constant EPOCH_DURATION = 2592000; // 1 month in seconds (30 days)
    uint256 constant EARLY_WITHDRAWAL_PENALTY = 10; // 10% early withdrawal penalty

    // Global metrics
    uint256 public totalStaked;
    uint256 public farmerRewards;
    uint256 public sustainablePool;
    uint256 public farmCount;

    // Farm structure
    struct Farm {
        uint256 farmHealth; // Health score of the farm
        uint256 yieldScore; // Yield score of the farm
        uint256 farmAPY; // Annual Percentage Yield of the farm
        address farmerAddress; // Address of the farmer who owns this farm
        bool active; // Whether the farm is active
        uint256 totalStaked; // Total tokens staked in this farm
    }

    // Staker structure
    struct Staker {
        uint256 amount; // Amount staked
        uint256 timestamp; // When the stake was created
        uint256 farmId; // ID of the farm where tokens are staked
        bool active; // Whether the stake is active
    }

    // Mappings
    mapping(uint256 => Farm) public farms; // farmId => Farm
    mapping(address => Staker) public stakers; // stakerAddress => Staker

    // Events
    event FarmCreated(
        uint256 indexed farmId,
        address indexed farmerAddress,
        uint256 farmAPY
    );
    event FarmUpdated(
        uint256 indexed farmId,
        uint256 farmHealth,
        uint256 yieldScore,
        uint256 farmAPY
    );
    event Staked(address indexed user, uint256 amount, uint256 farmId);
    event Withdrawn(
        address indexed user,
        uint256 amount,
        uint256 reward,
        bool penalized
    );

    /**
     * @dev Function to create a new farm.
     * @param _farmHealth Health score of the farm.
     * @param _yieldScore Yield score of the farm.
     * @param _farmAPY APY of the farm.
     * @param _farmerAddress Address of the farmer who will receive rewards.
     * @return farmId The ID of the newly created farm.
     */
    function createFarm(
        uint256 _farmHealth,
        uint256 _yieldScore,
        uint256 _farmAPY,
        address _farmerAddress
    ) external returns (uint256) {
        require(_farmHealth > 0, "Farm health must be greater than 0");
        require(_yieldScore > 0, "Yield score must be greater than 0");
        require(_farmAPY > 0, "Farm APY must be greater than 0");
        require(
            _farmerAddress != address(0),
            "Farmer address cannot be zero address"
        );

        uint256 newFarmId = farmCount + 1;
        farms[newFarmId] = Farm({
            farmHealth: _farmHealth,
            yieldScore: _yieldScore,
            farmAPY: _farmAPY,
            farmerAddress: _farmerAddress,
            active: true,
            totalStaked: 0
        });

        farmCount = newFarmId;

        emit FarmCreated(newFarmId, _farmerAddress, _farmAPY);

        return newFarmId;
    }

    /**
     * @dev Function to update farm parameters.
     * @param _farmId ID of the farm to update.
     * @param _farmHealth New health score of the farm.
     * @param _yieldScore New yield score of the farm.
     * @param _farmAPY New APY of the farm.
     */
    function updateFarm(
        uint256 _farmId,
        uint256 _farmHealth,
        uint256 _yieldScore,
        uint256 _farmAPY
    ) external {
        require(_farmId > 0 && _farmId <= farmCount, "Invalid farm ID");
        require(
            msg.sender == farms[_farmId].farmerAddress,
            "Only farm owner can update farm"
        );
        require(_farmHealth > 0, "Farm health must be greater than 0");
        require(_yieldScore > 0, "Yield score must be greater than 0");
        require(_farmAPY > 0, "Farm APY must be greater than 0");

        Farm storage farm = farms[_farmId];
        farm.farmHealth = _farmHealth;
        farm.yieldScore = _yieldScore;
        farm.farmAPY = _farmAPY;

        emit FarmUpdated(_farmId, _farmHealth, _yieldScore, _farmAPY);
    }

    /**
     * @dev Function to stake tokens in a specific farm.
     * @param _farmId ID of the farm to stake in.
     */
    function stake(uint256 _farmId) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_farmId > 0 && _farmId <= farmCount, "Invalid farm ID");
        require(farms[_farmId].active, "Farm is not active");

        Farm storage farm = farms[_farmId];

        // Update or create staker
        if (stakers[msg.sender].active) {
            require(
                stakers[msg.sender].farmId == _farmId,
                "Already staking in a different farm"
            );
            // Add to existing stake
            stakers[msg.sender].amount += msg.value;
            stakers[msg.sender].timestamp = block.timestamp; // Reset the timestamp
        } else {
            // Create new stake
            stakers[msg.sender] = Staker({
                amount: msg.value,
                timestamp: block.timestamp,
                farmId: _farmId,
                active: true
            });
        }

        // Update farm and global metrics
        farm.totalStaked += msg.value;
        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value, _farmId);
    }

    /**
     * @dev Function to withdraw staked tokens and rewards.
     */
    function withdraw() external {
        Staker storage staker = stakers[msg.sender];
        require(staker.active, "No active stake found");

        uint256 farmId = staker.farmId;
        Farm storage farm = farms[farmId];
        address farmerAddress = farm.farmerAddress;

        uint256 stakedAmount = staker.amount;
        uint256 stakingDuration = block.timestamp - staker.timestamp;
        uint256 reward = 0;
        bool penalized = false;

        // Calculate rewards and handle penalties
        if (stakingDuration < EPOCH_DURATION) {
            // Early withdrawal penalty
            penalized = true;
            uint256 penalty = (stakedAmount * EARLY_WITHDRAWAL_PENALTY) / 100;
            uint256 penaltyHalf = penalty / 2;

            // Send penalties to farmer and sustainable pool
            payable(farmerAddress).transfer(penaltyHalf);
            payable(SUSTAINABLE_POOL_ADDRESS).transfer(penaltyHalf);

            // Update global metrics
            farmerRewards += penaltyHalf;
            sustainablePool += penaltyHalf;

            // User gets staked amount minus penalty
            payable(msg.sender).transfer(stakedAmount - penalty);

            emit Withdrawn(msg.sender, stakedAmount - penalty, 0, true);
        } else {
            // Calculate rewards - farmAPY * stakedAmount / 12 (for monthly distribution)
            reward = (farm.farmAPY * stakedAmount) / 1200;

            // Distribute rewards
            uint256 userReward = (reward * 80) / 100;
            uint256 farmerReward = (reward * 17) / 100;
            uint256 sustainableReward = (reward * 3) / 100;

            // Update global metrics
            farmerRewards += farmerReward;
            sustainablePool += sustainableReward;

            // Send funds
            payable(farmerAddress).transfer(farmerReward);
            payable(SUSTAINABLE_POOL_ADDRESS).transfer(sustainableReward);
            payable(msg.sender).transfer(stakedAmount + userReward);

            emit Withdrawn(msg.sender, stakedAmount, userReward, false);
        }

        // Update farm and global metrics
        farm.totalStaked -= stakedAmount;
        totalStaked -= stakedAmount;

        // Clear staker data
        delete stakers[msg.sender];
    }

    /**
     * @dev View function to get information about a farm.
     * @param _farmId ID of the farm.
     * @return farmHealth The health score of the farm.
     * @return yieldScore The yield score of the farm.
     * @return farmAPY The APY of the farm.
     * @return farmerAddress The address of the farmer.
     * @return farmTotalStaked The total amount staked in the farm.
     */
    function getFarmInfo(
        uint256 _farmId
    )
        external
        view
        returns (
            uint256 farmHealth,
            uint256 yieldScore,
            uint256 farmAPY,
            address farmerAddress,
            uint256 farmTotalStaked
        )
    {
        require(_farmId > 0 && _farmId <= farmCount, "Invalid farm ID");
        Farm storage farm = farms[_farmId];

        return (
            farm.farmHealth,
            farm.yieldScore,
            farm.farmAPY,
            farm.farmerAddress,
            farm.totalStaked
        );
    }

    /**
     * @dev View function to calculate potential rewards.
     * @param _address The address of the staker.
     * @return stakedAmount The amount staked.
     * @return farmId The ID of the farm staked in.
     * @return potentialReward The potential reward based on current staking duration.
     * @return timeStaked The time staked in seconds.
     * @return farmAPY The APY of the farm.
     * @return farmerAddress The address of the farmer for this farm.
     */
    function getStakeInfo(
        address _address
    )
        external
        view
        returns (
            uint256 stakedAmount,
            uint256 farmId,
            uint256 potentialReward,
            uint256 timeStaked,
            uint256 farmAPY,
            address farmerAddress
        )
    {
        Staker storage staker = stakers[_address];
        require(staker.active, "No active stake found");

        Farm storage farm = farms[staker.farmId];
        uint256 stakingDuration = block.timestamp - staker.timestamp;
        uint256 reward = 0;

        if (stakingDuration >= EPOCH_DURATION) {
            reward = (farm.farmAPY * staker.amount) / 1200;
            reward = (reward * 80) / 100; // 80% goes to user
        }

        return (
            staker.amount,
            staker.farmId,
            reward,
            stakingDuration,
            farm.farmAPY,
            farm.farmerAddress
        );
    }

    /**
     * @dev View function to get global protocol metrics.
     * @return _totalStaked The total amount staked in the protocol.
     * @return _farmerRewards The total rewards accumulated for farmers.
     * @return _sustainablePool The total amount in the sustainable pool.
     * @return _farmCount The total number of farms.
     */
    function getProtocolMetrics()
        external
        view
        returns (
            uint256 _totalStaked,
            uint256 _farmerRewards,
            uint256 _sustainablePool,
            uint256 _farmCount
        )
    {
        return (totalStaked, farmerRewards, sustainablePool, farmCount);
    }
}
