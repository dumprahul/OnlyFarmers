// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DeFi Staking Protocol
 * @dev This contract allows users to stake tokens and earn rewards based on a dynamically calculated APY.
 */
contract DeFiStakingProtocol {
    // Constants
    address constant FARMER_ADDRESS = 0x62752de9CA838C71084d2B841Be1Aa71e45B4B7e;
    address constant SUSTAINABLE_POOL_ADDRESS = 0x1B02525C23130f4f64D6d86a41e916b70e5E03aA;
    uint256 constant EPOCH_DURATION = 604800; // 1 week in seconds
    uint256 constant EARLY_WITHDRAWAL_PENALTY = 10; // 10% early withdrawal penalty
    
    // Global metrics
    uint256 public totalStaked;
    uint256 public farmerRewards;
    uint256 public sustainablePool;
    
    // Staker structure
    struct Staker {
        uint256 amount;
        uint256 timestamp;
        uint256 yieldPercentage;
        bool active;
    }
    
    // Mapping of stakers
    mapping(address => Staker) public stakers;
    
    // Events
    event Staked(address indexed user, uint256 amount, uint256 yieldPercentage);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward, bool penalized);
    
    /**
     * @dev Function to stake tokens.
     * @param _yieldPercentage The yield percentage chosen by the user.
     */
    function stake(uint256 _yieldPercentage) external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_yieldPercentage > 0, "Yield percentage must be greater than 0");
        
        // Update or create staker
        if (stakers[msg.sender].active) {
            // Add to existing stake
            stakers[msg.sender].amount += msg.value;
            stakers[msg.sender].yieldPercentage = _yieldPercentage;
            stakers[msg.sender].timestamp = block.timestamp; // Reset the timestamp
        } else {
            // Create new stake
            stakers[msg.sender] = Staker({
                amount: msg.value,
                timestamp: block.timestamp,
                yieldPercentage: _yieldPercentage,
                active: true
            });
        }
        
        // Update global metrics
        totalStaked += msg.value;
        
        emit Staked(msg.sender, msg.value, _yieldPercentage);
    }
    
    /**
     * @dev Function to withdraw staked tokens and rewards.
     */
    function withdraw() external {
        Staker storage staker = stakers[msg.sender];
        require(staker.active, "No active stake found");
        
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
            payable(FARMER_ADDRESS).transfer(penaltyHalf);
            payable(SUSTAINABLE_POOL_ADDRESS).transfer(penaltyHalf);
            
            // Update global metrics
            farmerRewards += penaltyHalf;
            sustainablePool += penaltyHalf;
            
            // User gets staked amount minus penalty
            payable(msg.sender).transfer(stakedAmount - penalty);
            
            emit Withdrawn(msg.sender, stakedAmount - penalty, 0, true);
        } else {
            // Calculate rewards - APY * stakedAmount / 5200 (for weekly distribution)
            reward = (staker.yieldPercentage * stakedAmount) / 5200;
            
            // Distribute rewards
            uint256 userReward = (reward * 80) / 100;
            uint256 farmerReward = (reward * 17) / 100;
            uint256 sustainableReward = (reward * 3) / 100;
            
            // Update global metrics
            farmerRewards += farmerReward;
            sustainablePool += sustainableReward;
            
            // Send funds
            payable(FARMER_ADDRESS).transfer(farmerReward);
            payable(SUSTAINABLE_POOL_ADDRESS).transfer(sustainableReward);
            payable(msg.sender).transfer(stakedAmount + userReward);
            
            emit Withdrawn(msg.sender, stakedAmount, userReward, false);
        }
        
        // Update global metrics
        totalStaked -= stakedAmount;
        
        // Clear staker data
        delete stakers[msg.sender];
    }
    
    /**
     * @dev View function to calculate potential rewards.
     * @param _address The address of the staker.
     * @return stakedAmount The amount staked.
     * @return potentialReward The potential reward based on current staking duration.
     * @return timeStaked The time staked in seconds.
     * @return yieldPercentage The yield percentage chosen by the user.
     */
    function getStakeInfo(address _address) external view returns (
        uint256 stakedAmount,
        uint256 potentialReward,
        uint256 timeStaked,
        uint256 yieldPercentage
    ) {
        Staker storage staker = stakers[_address];
        require(staker.active, "No active stake found");
        
        uint256 stakingDuration = block.timestamp - staker.timestamp;
        uint256 reward = 0;
        
        if (stakingDuration >= EPOCH_DURATION) {
            reward = (staker.yieldPercentage * staker.amount) / 5200;
            reward = (reward * 80) / 100; // 80% goes to user
        }
        
        return (
            staker.amount,
            reward,
            stakingDuration,
            staker.yieldPercentage
        );
    }
    
    /**
     * @dev View function to get global protocol metrics.
     * @return _totalStaked The total amount staked in the protocol.
     * @return _farmerRewards The total rewards accumulated for farmers.
     * @return _sustainablePool The total amount in the sustainable pool.
     */
    function getProtocolMetrics() external view returns (
        uint256 _totalStaked,
        uint256 _farmerRewards,
        uint256 _sustainablePool
    ) {
        return (totalStaked, farmerRewards, sustainablePool);
    }
}