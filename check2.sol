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
    uint256 public totalStaked;

    event Staked(address indexed user, uint256 amount, uint256 yieldPercentage, uint256 time);
    event Withdrawn(address indexed user, uint256 amount, uint256 reward);

    constructor() {
        owner = msg.sender;
    }

    function stake(address user, uint256 amount, uint256 yieldPercentage, uint256 time) external {
        require(amount > 0, "Amount must be greater than zero");
        require(yieldPercentage >= 0 && yieldPercentage <= 100, "Invalid Yield Percentage");

        stakes[user] = StakeInfo({
            user: user,
            amount: amount,
            yieldPercentage: yieldPercentage,
            startTime: time,
            active: true
        });

        totalStaked += amount;
        emit Staked(user, amount, yieldPercentage, time);
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
            farmerRewards[msg.sender] += penalty / 2; // 5% to farmer rewards
            fineBalance[msg.sender] += penalty / 2; // 5% to fine balance
        }
        
        uint256 userReward = (rewardAmount * 80) / 100;
        uint256 farmerReward = (rewardAmount * 17) / 100;
        uint256 sustainabilityReward = (rewardAmount * 3) / 100;

        farmerRewards[msg.sender] += farmerReward;
        sustainablePool[msg.sender] += sustainabilityReward;
        
        delete stakes[msg.sender];
        totalStaked -= stakeInfo.amount;
        
        emit Withdrawn(msg.sender, stakedAmount, userReward);
    }
}