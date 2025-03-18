// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FarmStaking {
    struct StakeInfo {
        address user;
        uint256 amount;
        uint256 yieldPercentage;
        uint256 startTime;
        bool active;
    }

    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public farmerRewards;
    mapping(address => uint256) public sustainablePool;
    mapping(address => uint256) public fineBalance;

    uint256 public constant EPOCH_DURATION = 1 weeks;
    uint256 public constant EARLY_WITHDRAWAL_PENALTY = 10; // 10%

    address public owner;
    address public constant FARMER_ADDRESS = 0x62752de9CA838C71084d2B841Be1Aa71e45B4B7e;
    address public constant SUSTAINABLE_POOL_ADDRESS = 0x1B02525C23130f4f64D6d86a41e916b70e5E03aA;

    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount, uint256 yieldPercentage, uint256 time);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);
    event PenaltyApplied(address indexed user, uint256 penaltyAmount);

    constructor() {
        owner = msg.sender;
    }

    function stake(uint256 amount, uint256 yieldPercentage) external {
        require(amount > 0, "Amount must be greater than zero");
        require(yieldPercentage >= 0 && yieldPercentage <= 100, "Invalid Yield Percentage");
        require(!stakes[msg.sender].active, "User already has an active stake");

        stakes[msg.sender] = StakeInfo({
            user: msg.sender,
            amount: amount,
            yieldPercentage: yieldPercentage,
            startTime: block.timestamp,
            active: true
        });

        totalStaked += amount;
        emit Staked(msg.sender, amount, yieldPercentage, block.timestamp);
    }

    function viewStake(address user) external view returns (StakeInfo memory) {
        return stakes[user];
    }

    function calculateAPY(uint256 yieldPercentage) public pure returns (uint256) {
        if (yieldPercentage >= 85) return 15; // 15% APY
        if (yieldPercentage >= 70) return 12; // 12% APY
        if (yieldPercentage >= 60) return 8;  // 8% APY
        return 5; // Minimum APY 5%
    }

    function withdraw() external {
        StakeInfo storage stakeInfo = stakes[msg.sender];
        require(stakeInfo.active, "No active stake");

        uint256 stakedAmount = stakeInfo.amount;
        uint256 timeElapsed = block.timestamp - stakeInfo.startTime;
        uint256 apy = calculateAPY(stakeInfo.yieldPercentage);
        uint256 weeklyReward = (apy * stakedAmount) / 5200; // Weekly APY Calculation
        uint256 rewardAmount = weeklyReward * (timeElapsed / EPOCH_DURATION);

        uint256 penalty = 0;
        if (timeElapsed < EPOCH_DURATION) {
            penalty = (stakedAmount * EARLY_WITHDRAWAL_PENALTY) / 100;
            stakedAmount -= penalty;

            uint256 farmerCut = penalty / 2;
            uint256 sustainableCut = penalty / 2;

            farmerRewards[FARMER_ADDRESS] += farmerCut;
            sustainablePool[SUSTAINABLE_POOL_ADDRESS] += sustainableCut;
            fineBalance[msg.sender] += penalty;

            emit PenaltyApplied(msg.sender, penalty);
        }

        uint256 userReward = (rewardAmount * 80) / 100;
        uint256 farmerReward = (rewardAmount * 17) / 100;
        uint256 sustainabilityReward = (rewardAmount * 3) / 100;

        farmerRewards[FARMER_ADDRESS] += farmerReward;
        sustainablePool[SUSTAINABLE_POOL_ADDRESS] += sustainabilityReward;

        delete stakes[msg.sender];
        totalStaked -= stakeInfo.amount;

        emit Withdrawn(msg.sender, stakedAmount, userReward);
    }
}
