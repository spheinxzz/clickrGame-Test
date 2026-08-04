export const achievements = [

  {
    id: "first_click",
    name: "First Click",
    description: "Click the button for the first time.",
    requirement: {
      type: "clicks",
      amount: 1
    },
    reward: {
      type: "money",
      amount: 100
    }
  },


  {
    id: "click_master",
    name: "Click Master",
    description: "Reach 1,000 total clicks.",
    requirement: {
      type: "clicks",
      amount: 1000
    },
    reward: {
      type: "money",
      amount: 5000
    }
  },


  {
    id: "millionaire",
    name: "Millionaire",
    description: "Earn $1,000,000 total money.",
    requirement: {
      type: "totalMoney",
      amount: 1000000
    },
    reward: {
      type: "gems",
      amount: 10
    }
  },


  {
    id: "upgrade_beginner",
    name: "Getting Stronger",
    description: "Buy your first upgrade.",
    requirement: {
      type: "upgrades",
      amount: 1
    },
    reward: {
      type: "money",
      amount: 2500
    }
  },


  {
    id: "upgrade_master",
    name: "Upgrade Master",
    description: "Reach level 100 on an upgrade.",
    requirement: {
      type: "maxUpgrade",
      amount: 100
    },
    reward: {
      type: "gems",
      amount: 50
    }
  },


  {
    id: "collector",
    name: "Gem Collector",
    description: "Collect 1,000 gems.",
    requirement: {
      type: "gems",
      amount: 1000
    },
    reward: {
      type: "money",
      amount: 100000
    }
  }

];