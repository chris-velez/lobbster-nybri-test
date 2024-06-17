var myApp = angular.module('myApp', []);

myApp.controller('myController', function ($scope) {
    $scope.currentNavItem = 'page2';

    //========================================
	// updated for ranking button : 03/14/2024
	//========================================
	
	$scope.showme = false;
	$scope.showBankAlert = false; // This will control the bank scores alert
	$scope.showFintechAlert = false; // This will control the fintech scores alert

	
	//========================================
	// End of new updates : 03/14/2024
	//========================================
    
    $scope.weights = {
        numBranches: 0,
        branchLocDistribution: 0,
        onlineBankings: 0,
        atmFees: 0,
        checkingFees: 0,
        savingsFees: 0,
        overdraft: 0,
        overdraftLimit: 0,
        creditCards: 0,
        customerService: 0,                  // **JC - Changed to "creditCardFees" to "customerService"
        acceptAltId: 0,
        wireTransferCost: 0,
        loanOriginationMarketShare: 0,
        loanAcceptNy: 0,
        loanAcceptLatino: 0,
        loanAcceptBlack: 0,
        loanAcceptLowIncome: 0,
        percentLowBorrowers: 0,
        loanAcceptLowComm: 0,
        percentCommColor: 0
    };
	
	$scope.tWeights = {                                   // This will be used for the "ng-model" in the Fintech HTML area
			peerToPeerBankin: 0,
			encryptTrans: 0,
			linkExternalAccount: 0,
			linkExternalCreditCard: 0,
			fraudProtection: 0,
			oneTouchLogin: 0,
			paycheckAdvance: 0,
			contactlessPayment: 0,
			twoFactorAuth: 0,
			transactionFees: 0,
			creditBuilding: 0,
			creditCardOffering: 0,
			overdraftFees: 0,
			creditCardPaymentFees: 0,
			cryptoPurchaseOptions: 0,
			cashAdvance: 0
		
	}
	
	$scope.rankingType = "";                              // This variable is used as text for which ranking results you get (Bank vs Fintech) [~Line 26 in ranking.html] 
	

    $scope.calculateTotal = function () {
        $scope.total = 0;
        for (var weight in $scope.weights) {
            $scope.total += parseFloat($scope.weights[weight]); // Use parseFloat instead of parseInt to include decimal values (03/26/2024 updated)
        }
        return $scope.total;
    };
	
	// New Function For tWeights stuff
	$scope.calculateTotal2 = function () {
        $scope.total = 0;
        for (var weight in $scope.tWeights) {
            $scope.total += parseFloat($scope.tWeights[weight]); // Use parseFloat instead of parseInt to include decimal values (03/26/2024 updated)
        }
        return $scope.total;
    };
	
	


	// ==============================================================
    // New VARIABLES
	// ==============================================================
	
	var techInfo = [{
		bankName: 'payPal',                               // Be sure to keep the names the identical to the variables below in the "finalScore2()" function or else it will throw an NULL error
		bankRatings: {
			peerToPeerBankin: 5,
			encryptTrans: 6.25,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 6.25,
			fraudProtection: 6.25,
			oneTouchLogin: 6.25,
			paycheckAdvance: 0,
			contactlessPayment: 6.25,
			twoFactorAuth: 6.25,
			transactionFees: 5,
			creditBuilding: 0,
			creditCardOffering: 6.25,
			overdraftFees: 6.25,
			creditCardPaymentFees: 3.75,
			cryptoPurchaseOptions: 2.5,
			cashAdvance: 0                                // This was marked BLANK in the spread sheet, so keep an eye on this one and be sure to ask the client for clarification...
			
	}},
	
	{
		bankName: 'applePay',
		bankRatings: {
			peerToPeerBankin: 5,
			encryptTrans: 6.25,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 6.25,
			fraudProtection: 6.25,
			oneTouchLogin: 3.75,
			paycheckAdvance: 0,
			contactlessPayment: 3.75,
			twoFactorAuth: 6.25,
			transactionFees: 6.25,
			creditBuilding: 6.25,
			creditCardOffering: 6.25,
			overdraftFees: 2.5,
			creditCardPaymentFees: 2.5,
			cryptoPurchaseOptions: 3.75,
			cashAdvance: 0
		
	}},
	
	{
		bankName: 'googlePay',
		bankRatings: {
			peerToPeerBankin: 4.25,
			encryptTrans: 6.25,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 3.75,
			fraudProtection: 6.25,
			oneTouchLogin: 3.75,
			paycheckAdvance: 0,
			contactlessPayment: 6.25,
			twoFactorAuth: 6.25,
			transactionFees: 0,
			creditBuilding: 0,
			creditCardOffering: 2.5,
			overdraftFees: 2.5,
			creditCardPaymentFees: 3.75,
			cryptoPurchaseOptions: 6.25,
			cashAdvance: 0
		
	}},
	
	{
		bankName: 'venmo',
		bankRatings: {
			peerToPeerBankin: 4.25,
			encryptTrans: 0,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 6.25,
			fraudProtection: 6.25,
			oneTouchLogin: 0,
			paycheckAdvance: 0,
			contactlessPayment: 6.25,
			twoFactorAuth: 6.25,
			transactionFees: 2.5,
			creditBuilding: 0,
			creditCardOffering: 2.5,
			overdraftFees: 0,
			creditCardPaymentFees: 2.5,
			cryptoPurchaseOptions: 2,
			cashAdvance: 2.5
		
	}},
	
	{
		bankName: 'cashApp',
		bankRatings: {
			peerToPeerBankin: 6.25,
			encryptTrans: 6.25,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 6.25,
			fraudProtection: 6.25,
			oneTouchLogin: 6.25,
			paycheckAdvance: 0,
			contactlessPayment: 0,
			twoFactorAuth: 0,
			transactionFees: 3.75,
			creditBuilding: 0,
			creditCardOffering: 0,
			overdraftFees: 0,
			creditCardPaymentFees: 2.5,
			cryptoPurchaseOptions: 3,
			cashAdvance: 0
		
	}},
	
	{
		bankName: 'chime',
		bankRatings: {
			peerToPeerBankin: 6.25,
			encryptTrans: 6.25,
			linkExternalAccount: 2.5,
			linkExternalCreditCard: 0,
			fraudProtection: 3.75,
			oneTouchLogin: 0,
			paycheckAdvance: 3.75,
			contactlessPayment: 6.25,
			twoFactorAuth: 3.75,
			transactionFees: 3.75,
			creditBuilding: 3.75,
			creditCardOffering: 0,
			overdraftFees: 1.25,
			creditCardPaymentFees: 0,
			cryptoPurchaseOptions: 1.25,
			cashAdvance: 0
		
	}},
	
	{
		bankName: 'moneyLion',
		bankRatings: {
			peerToPeerBankin: 1,
			encryptTrans: 6.25,
			linkExternalAccount: 3.75,
			linkExternalCreditCard: 5,
			fraudProtection: 0,
			oneTouchLogin: 0,
			paycheckAdvance: 6.25,
			contactlessPayment: 0,
			twoFactorAuth: 0,
			transactionFees: 3.75,
			creditBuilding: 5,
			creditCardOffering: 5,
			overdraftFees: 0,
			creditCardPaymentFees: 0,
			cryptoPurchaseOptions: 1.25,
			cashAdvance: 3.5
		
	}},
	
	{
		bankName: 'zelle',
		bankRatings: {
			peerToPeerBankin: 6.25,
			encryptTrans: 6.25,
			linkExternalAccount: 6.25,
			linkExternalCreditCard: 0,
			fraudProtection: 0,
			oneTouchLogin: 0,
			paycheckAdvance: 0,
			contactlessPayment: 0,
			twoFactorAuth: 6.25,
			transactionFees: 6.25,
			creditBuilding: 0,
			creditCardOffering: 0,
			overdraftFees: 0,
			creditCardPaymentFees: 0,
			cryptoPurchaseOptions: .5,
			cashAdvance: 0
		
	}}];
	
	// ==============================================================
	// END OF NEW VARIABLES
	// ==============================================================
	
	
	// **JC - Updated for all new banks, but set their scores to all zeros because we are missing a lot of content. We will add them once we get a solid answer on where the info is. 
	var bankInfo = [{
        bankName: 'bankOfAmerica',
        bankRatings: {
            numBranches: 5,
            branchLocDistribution: 4,
            onlineBankings: 5,
            atmFees: 4,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 4,
            creditCards: 2,
            customerService: 2,
            acceptAltId: 1,
            wireTransferCost: 5,
            loanOriginationMarketShare: 3,
            loanAcceptNy: 1,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 1,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 1,
            percentCommColor: 4
            
        }
  }, {
        bankName: 'mt',
        bankRatings: {
            numBranches: 5,
            branchLocDistribution: 3,
            onlineBankings: 5,
            atmFees: 3,
            checkingFees: 2,
            savingsFees: 4,
            overdraft: 5,
            overdraftLimit: 4,
            creditCards: 3,
            customerService: 3,
            acceptAltId: 3,
            wireTransferCost: 3,
            loanOriginationMarketShare: 4,
            loanAcceptNy: 3,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 4,
            percentCommColor: 2  
        }
  }, {
        bankName: 'capitalOne',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 4,
            onlineBankings: 4,
            atmFees: 5,
            checkingFees: 5,
            savingsFees: 5,
            overdraft: 3,
            overdraftLimit: 5,
            creditCards: 2,
            customerService: 1,
            acceptAltId: 3,
            wireTransferCost: 4,
            loanOriginationMarketShare: 0, // All zeroes below
            loanAcceptNy: 0,
            loanAcceptLatino: 0,
            loanAcceptBlack: 0,
            loanAcceptLowIncome: 0,
            percentLowBorrowers: 0,
            loanAcceptLowComm: 0,
            percentCommColor: 0 
        }
  }, {
        bankName: 'ridgewoodSavings',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 5,
            onlineBankings: 5,
            atmFees: 5,
            checkingFees: 4,
            savingsFees: 5,
            overdraft: 4,
            overdraftLimit: 3,
            creditCards: 5,
            customerService: 4,
            acceptAltId: 5,
            wireTransferCost: 4,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 2,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 1,
            loanAcceptLowComm: 3,
            percentCommColor: 4
        }
  }, {
        bankName: 'citibank',
        bankRatings: {
           numBranches: 4,
            branchLocDistribution: 4,
            onlineBankings: 5,
            atmFees: 4,
            checkingFees: 5,
            savingsFees: 4,
            overdraft: 2,
            overdraftLimit: 5,
            creditCards: 2,
            customerService: 0,                 // Rating is a 0
            acceptAltId: 1,
            wireTransferCost: 4,
            loanOriginationMarketShare: 2,
            loanAcceptNy: 3,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 2,
            percentLowBorrowers: 2,
            loanAcceptLowComm: 2,
            percentCommColor: 5
        }
  }, {
        bankName: 'santander', 
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 3,
            onlineBankings: 3,
            atmFees: 5,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 4,
            creditCards: 3,
            customerService: 2,
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 1,
            loanAcceptLatino: 1,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 1,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 1,
            percentCommColor: 4
        }
  }, {
        bankName: 'tdBank',
        bankRatings: {
            numBranches: 5,
            branchLocDistribution: 3,
            onlineBankings: 5,
            atmFees: 3,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 4,
            acceptAltId: 1,
            wireTransferCost: 3,
            loanOriginationMarketShare: 3,
            loanAcceptNy: 2,
            loanAcceptLatino: 1,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 1,
            percentLowBorrowers: 2,
            loanAcceptLowComm: 1,
            percentCommColor: 5
        }
  }, {
        bankName: 'keyBank',
        bankRatings: {
            numBranches: 4,
            branchLocDistribution: 4,
            onlineBankings: 5,
            atmFees: 3,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 2,
            overdraftLimit: 3,
            creditCards: 3,
            customerService: 5,
            acceptAltId: 3,
            wireTransferCost: 3,
            loanOriginationMarketShare: 3,
            loanAcceptNy: 2,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 3,
            percentCommColor: 1
        }
  }, {
        bankName: 'citizensBank',
        bankRatings: {
            numBranches: 4,
            branchLocDistribution: 3,
            onlineBankings: 4,
            atmFees: 3,
            checkingFees: 5,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 1,
            creditCards: 5,
            customerService: 2,
            acceptAltId: 1,
            wireTransferCost: 4,
            loanOriginationMarketShare: 5,
            loanAcceptNy: 1,
            loanAcceptLatino: 1,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 2,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 2,
            percentCommColor: 3
        }
  }, {
        bankName: 'flagStarNYCB',
        bankRatings: {
            numBranches: 4,
            branchLocDistribution: 3,
            onlineBankings: 4,
            atmFees: 4,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 1,
            overdraftLimit: 5,
            creditCards: 3,
            customerService: 2,
            acceptAltId: 1,
            wireTransferCost: 1,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 2,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 3,
            percentCommColor: 4
        }
  }, {
        bankName: 'wellsFargo',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 2,
            onlineBankings: 4,
            atmFees: 4,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 2,
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 4,
            loanAcceptNy: 2,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 2,
            percentLowBorrowers: 2,
            loanAcceptLowComm: 2,
            percentCommColor: 3
        }
  }, {
        bankName: 'flushingBank',
        bankRatings: {
            numBranches: 1,
            branchLocDistribution: 5,
            onlineBankings: 3,
            atmFees: 5,
            checkingFees: 2,
            savingsFees: 4,
            overdraft: 2,
            overdraftLimit: 5,
            creditCards: 3,
            customerService: 3,
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 3,
            loanAcceptLatino: 5,
            loanAcceptBlack: 0,
            loanAcceptLowIncome: 0,
            percentLowBorrowers: 1,
            loanAcceptLowComm: 0,
            percentCommColor: 5
        }
  }, {
        bankName: 'communityBank',
        bankRatings: {
            numBranches: 4,
            branchLocDistribution: 3,
            onlineBankings: 3,
            atmFees: 4,
            checkingFees: 3,
            savingsFees: 5,
            overdraft: 5,
            overdraftLimit: 1,
            creditCards: 4,
            customerService: 0, // The rating is a 0
            acceptAltId: 1,
            wireTransferCost: 1,
            loanOriginationMarketShare: 2,
            loanAcceptNy: 4,
            loanAcceptLatino: 2,
            loanAcceptBlack: 3,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 4,
            percentCommColor: 1
        }
  }, {
        bankName: 'nbtBank',
        bankRatings: {
            numBranches: 4,
            branchLocDistribution: 4,
            onlineBankings: 3,
            atmFees: 5,
            checkingFees: 5,
            savingsFees: 5,
            overdraft: 1,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 1,
            acceptAltId: 3,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 3,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 3,
            percentCommColor: 1
        }
  }, {
        bankName: 'websterBank',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 3,
            onlineBankings: 3,
            atmFees: 3,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 4,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 2,
            acceptAltId: 3,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 3,
            loanAcceptLatino: 1,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 1,
            percentLowBorrowers: 1,
            loanAcceptLowComm: 1,
            percentCommColor: 3
        }
  }, {
        bankName: 'jpMorgan',
        bankRatings: {
            numBranches: 5,
            branchLocDistribution: 3,
            onlineBankings: 5,
            atmFees: 3,
            checkingFees: 4,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 1,
            creditCards: 1,
            customerService: 0, // Rating is 0
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 5,
            loanAcceptNy: 4,
            loanAcceptLatino: 3,
            loanAcceptBlack: 3,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 4,
            percentCommColor: 4
        }
  }, {
        bankName: 'tompkinsBank',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 2,
            onlineBankings: 4,
            atmFees: 5,
            checkingFees: 4,
            savingsFees: 0, // Rating is 0
            overdraft: 2,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 4,
            acceptAltId: 1,
            wireTransferCost: 4,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 5,
            loanAcceptLatino: 5,
            loanAcceptBlack: 5,
            loanAcceptLowIncome: 5,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 5,
            percentCommColor: 1
        }
  }, {
        bankName: 'northwestBank',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 5,
            onlineBankings: 4,
            atmFees: 3,
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 1,
            overdraftLimit: 1,
            creditCards: 4,
            customerService: 3,
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 2,
            loanAcceptNy: 4,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 4,
            percentCommColor: 1
        }
  }, {
        bankName: 'dimeBank',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 3,
            onlineBankings: 3,
            atmFees: 0, //Rating is 0
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 2,
            overdraftLimit: 5,
            creditCards: 3,
            customerService: 4,
            acceptAltId: 1,
            wireTransferCost: 0, // Rating is 0
            loanOriginationMarketShare: 1,
            loanAcceptNy: 2,
            loanAcceptLatino: 2,
            loanAcceptBlack: 3,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 1,
            loanAcceptLowComm: 4,
            percentCommColor: 4
        }
  }, {
        bankName: 'valleyBank',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 4,
            onlineBankings: 4,
            atmFees: 4,
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 2,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 1,
            acceptAltId: 1,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 4,
            loanAcceptLatino: 3,
            loanAcceptBlack: 3,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 2,
            loanAcceptLowComm: 4,
            percentCommColor: 3
        }
  }, {
        bankName: 'fiveStarBank',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 2,
            onlineBankings: 2,
            atmFees: 4,
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 3,
            overdraftLimit: 1,
            creditCards: 3,
            customerService: 2,
            acceptAltId: 1,
            wireTransferCost: 1,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 4,
            loanAcceptLatino: 4,
            loanAcceptBlack: 3,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 5,
            loanAcceptLowComm: 5,
            percentCommColor: 2
        }
  }, {
        bankName: 'canNationalBank',
        bankRatings: {
            numBranches: 1,
            branchLocDistribution: 2,
            onlineBankings: 4,
            atmFees: 4,
            checkingFees: 2,
            savingsFees: 4,
            overdraft: 1,
            overdraftLimit: 1,
            creditCards: 4,
            customerService: 2,
            acceptAltId: 2,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 4,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 4,
            percentCommColor: 1
        }
  }, {
        bankName: 'berkshireBank',
        bankRatings: {
            numBranches: 1,
            branchLocDistribution: 1,
            onlineBankings: 3,
            atmFees: 3,
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 4,
            overdraftLimit: 1,
            creditCards: 4,
            customerService: 0, //Rating is 0
            acceptAltId: 1,
            wireTransferCost: 3,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 2,
            loanAcceptLatino: 1,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 5,
            loanAcceptLowComm: 3,
            percentCommColor: 1
        }
  }, {
        bankName: 'applebank',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 5,
            onlineBankings: 2,
            atmFees: 4,
            checkingFees: 1,
            savingsFees: 5,
            overdraft: 1,
            overdraftLimit: 1,
            creditCards: 2,
            customerService: 2,
            acceptAltId: 1,
            wireTransferCost: 0, //Rating is 0
            loanOriginationMarketShare: 0,
            loanAcceptNy: 0,
            loanAcceptLatino: 0,
            loanAcceptBlack: 0,
            loanAcceptLowIncome: 0,
            percentLowBorrowers: 0,
            loanAcceptLowComm: 0,
            percentCommColor: 0
        }
  }, {
        bankName: 'trustcoBank',
        bankRatings: {
            numBranches: 3,
            branchLocDistribution: 2,
            onlineBankings: 2,
            atmFees: 5,
            checkingFees: 1,
            savingsFees: 4,
            overdraft: 0, // Rating is 0
            overdraftLimit: 1,
            creditCards: 0, // Rating is 0
            customerService: 3,
            acceptAltId: 1,
            wireTransferCost: 0, // Rating is 0
            loanOriginationMarketShare: 1,
            loanAcceptNy: 3,
            loanAcceptLatino: 2,
            loanAcceptBlack: 2,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 3,
            loanAcceptLowComm: 3,
            percentCommColor: 1
        }
  }, {
        bankName: 'chemungTrust',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 4,
            onlineBankings: 3,
            atmFees: 0, // Rating is 0
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 0, // Rating is 0
            overdraftLimit: 1,
            creditCards: 5,
            customerService: 1,
            acceptAltId: 2,
            wireTransferCost: 0, // Rating is 0
            loanOriginationMarketShare: 1,
            loanAcceptNy: 4,
            loanAcceptLatino: 2,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 4,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 4,
            percentCommColor: 1
        }
  }, {
        bankName: 'firstNationalBank',
        bankRatings: {
            numBranches: 2,
            branchLocDistribution: 1,
            onlineBankings: 2,
            atmFees: 5,
            checkingFees: 3,
            savingsFees: 4,
            overdraft: 4,
            overdraftLimit: 4,
            creditCards: 0, // Rating is 0
            customerService: 0, // Rating is 0
            acceptAltId: 1,
            wireTransferCost: 1,
            loanOriginationMarketShare: 1,
            loanAcceptNy: 5,
            loanAcceptLatino: 2,
            loanAcceptBlack: 4,
            loanAcceptLowIncome: 0,
            percentLowBorrowers: 1,
            loanAcceptLowComm: 0,
            percentCommColor: 2
        }
  }, {
        bankName: 'glensFalls',
        bankRatings: {
            numBranches: 1,
            branchLocDistribution: 4,
            onlineBankings: 4,
            atmFees: 0, // Rating is 0
            checkingFees: 2,
            savingsFees: 4,
            overdraft: 0, // Rating is 0
            overdraftLimit: 0, // Rating is 0
            creditCards: 4,
            customerService: 0, // Rating is 0
            acceptAltId: 2,
            wireTransferCost: 0, // Rating is 0
            loanOriginationMarketShare: 1,
            loanAcceptNy: 4,
            loanAcceptLatino: 3,
            loanAcceptBlack: 1,
            loanAcceptLowIncome: 3,
            percentLowBorrowers: 4,
            loanAcceptLowComm: 1,
            percentCommColor: 1
        }
  }];

    $scope.reset = function () {
        for (var weight in $scope.weights) {
            if ($scope.weights[weight] === "" || isNaN($scope.weights[weight]) || $scope.weights[weight] < 0) {
                $scope.weights[weight] = 0;
				console.log("Triggered For Reset")
            }
        }
    };
	
	// This function is used to reset the values of the custom Fintech area back to zero if there is no number present
	$scope.reset2 = function () {
        for (var weight in $scope.tWeights) {
            if ($scope.tWeights[weight] === "" || isNaN($scope.tWeights[weight]) || $scope.tWeights[weight] < 0) {
                $scope.tWeights[weight] = 0;
				console.log("Triggered For Reset 2")
            }
        }
    };

    $scope.overlayShow = function() {
        
    }
    
	
	// This function is used for the weight/score calculator on the custom BANK area. Please don't change this too much or you run the risk of bricking the whole system.
    $scope.finalScore = function () {                          
        $scope.rankingType = "Bank Name"; 
		
		// Updated Bank Lists, always make sure it's EXACTLY how the "bankName" appears in the "bankInfo" variable or else it won't work
		$scope.bankOfAmerica = []; 
		$scope.mt = [];
		$scope.capitalOne = [];
		$scope.ridgewoodSavings = [];
		$scope.citibank = [];
		$scope.santander = [];
		$scope.tdBank = [];
		$scope.keyBank = [];
		$scope.citizensBank = [];
		$scope.flagStarNYCB = [];
		$scope.wellsFargo = [];
		$scope.flushingBank = [];
		$scope.communityBank = [];
		$scope.nbtBank = [];
		$scope.websterBank = [];
		$scope.jpMorgan = [];
		$scope.tompkinsBank = [];
		$scope.northwestBank = [];
		$scope.dimeBank = [];
		$scope.valleyBank = [];
		$scope.fiveStarBank = [];
		$scope.canNationalBank = [];
		$scope.berkshireBank = [];
		$scope.applebank = [];
		$scope.trustcoBank = [];
		$scope.chemungTrust = [];
		$scope.firstNationalBank = [];
		$scope.glensFalls = [];


        for (var x = 0; x < bankInfo.length; x++) {                                                    // For all variables in the bank info list...
            $scope.score = 0;                                                                          // set score = 0
            for (var score in bankInfo[x].bankRatings) {                                               // For the score variable in all the ratings in the specific bank...
                $scope.current = bankInfo[x].bankName;                                                 // Grab the bank name
				$scope.score = parseInt(bankInfo[x].bankRatings[score] / 5 * $scope.weights[score]);   // Divide the score by 5 to calculate the weight of the score
				$scope[$scope.current].push($scope.score);                                             // Push the current score to the overall score 
				
            }
            console.log($scope.current + ": " + $scope[$scope.current]);
        }

        $scope.oneScore = function (bank) {
            var total = 0;
            for (var y = 0; y < bank.length; y++) {
                total += parseInt(bank[y]);
            }
            return total;
        };

        $scope.allScores = [                                                                            // PRINT OUT ALL THE SCORES
            {bankname: 'Bank of America', score: $scope.oneScore($scope.bankOfAmerica)},
			{bankname: 'M & T', score: $scope.oneScore($scope.mt)},
			{bankname: 'Capital One', score: $scope.oneScore($scope.capitalOne)},
			{bankname: 'Ridgewood Savings Bank', score: $scope.oneScore($scope.ridgewoodSavings)},
			{bankname: 'Citibank', score: $scope.oneScore($scope.citibank)},
			{bankname: 'Santander Bank', score: $scope.oneScore($scope.santander)}, 
			{bankname: 'TD Bank', score: $scope.oneScore($scope.tdBank)},
			{bankname: 'Keybank', score: $scope.oneScore($scope.keyBank)},
			{bankname: 'Citizens Bank', score: $scope.oneScore($scope.citizensBank)},
			{bankname: 'Flagstar/NYCB', score: $scope.oneScore($scope.flagStarNYCB)},
			{bankname: 'Wells Fargo', score: $scope.oneScore($scope.wellsFargo)},
			{bankname: 'Flushing Bank', score: $scope.oneScore($scope.flushingBank)},
			{bankname: 'Community Bank', score: $scope.oneScore($scope.communityBank)},
			{bankname: 'NBT Bank', score: $scope.oneScore($scope.nbtBank)},
			{bankname: 'Webster Bank', score: $scope.oneScore($scope.websterBank)},
			{bankname: 'JP Morgan', score: $scope.oneScore($scope.jpMorgan)},
			{bankname: 'Tompkins Community Bank', score: $scope.oneScore($scope.tompkinsBank)},
			{bankname: 'Northwest Bank', score: $scope.oneScore($scope.northwestBank)},
			{bankname: 'Dime Community Bank', score: $scope.oneScore($scope.dimeBank)},
			{bankname: 'Valley National Bank', score: $scope.oneScore($scope.valleyBank)},
			{bankname: 'Five Star Bank', score: $scope.oneScore($scope.fiveStarBank)},
			{bankname: 'The Canandaigua National Bank and Trust Company', score: $scope.oneScore($scope.canNationalBank)},
			{bankname: 'Berkshire Bank', score: $scope.oneScore($scope.berkshireBank)},
			{bankname: 'Apple Bank for Savings', score: $scope.oneScore($scope.applebank)},
			{bankname: 'Trustco Bank', score: $scope.oneScore($scope.trustcoBank)},
			{bankname: 'Chemung Canal Trust Company', score: $scope.oneScore($scope.chemungTrust)},
			{bankname: 'The First National Bank of Long Island', score: $scope.oneScore($scope.firstNationalBank)},
            {bankname: 'Glens Falls National Bank and Trust Company', score: $scope.oneScore($scope.glensFalls)} 
        ];
        
        $scope.createOverlay = function() {
            $scope.className = "noscroll";
            if ($scope.className = "noscroll") {
                $scope.className = "scroll";
            } 
            else {
                $scope.className = "noscroll";
            }
        };
        return $scope.score;
    };
	
	
	
	// ==========================================================================================
	// ============================== NEW FUNCTION -- V1.0 ======================================
	// ==========================================================================================
	

	
	$scope.finalScore2 = function () {                          
        $scope.rankingType = "Fintech Name";
		$scope.payPal = [];                                                                            // Defining Variables For Lists
        $scope.applePay = [];
        $scope.googlePay = [];
        $scope.venmo = [];
        $scope.cashApp = [];
        $scope.chime = [];
        $scope.moneyLion = [];
        $scope.zelle = [];

		//console.log($scope.tWeights)

        for (var x = 0; x < techInfo.length; x++) {                                                    // For all variables in the bank info list...
            $scope.score = 0;                                                                          // set score = 0
            for (var score in techInfo[x].bankRatings) {                                               // For the score variable in all the ratings in the specific bank...
                $scope.current = techInfo[x].bankName;                                                 // Grab the bank name
				$scope.score = parseFloat(techInfo[x].bankRatings[score] / 6.25 * $scope.tWeights[score]).toFixed(2);  
                $scope[$scope.current].push($scope.score);                                             
            }
            console.log($scope.current + ": " + $scope[$scope.current]);                                
			//console.log("")
        }

        $scope.oneScore = function (bank) {                                                            
            var total = 0;                                                                             
            for (var y = 0; y < bank.length; y++) {                                                    
                total += parseFloat(bank[y]);
            }
            return total;
			
        };


        $scope.allScores = [                                                                            // Create a list for all the scores to be displayed.
            {bankname: 'PayPal', score: parseFloat($scope.oneScore($scope.payPal).toFixed(2))},
            {bankname: 'ApplePay', score: parseFloat($scope.oneScore($scope.applePay).toFixed(2))},
            {bankname: 'GooglePay', score: parseFloat($scope.oneScore($scope.googlePay).toFixed(2))},
            {bankname: 'Venmo', score: parseFloat($scope.oneScore($scope.venmo).toFixed(2))},
            {bankname: 'CashApp', score: parseFloat($scope.oneScore($scope.cashApp).toFixed(2))},
            {bankname: 'Chime', score: parseFloat($scope.oneScore($scope.chime).toFixed(2))},
            {bankname: 'MoneyLion', score: parseFloat($scope.oneScore($scope.moneyLion).toFixed(2))},
            {bankname: 'Zelle', score: parseFloat($scope.oneScore($scope.zelle).toFixed(2))}

        ];
		
        
        $scope.createOverlay = function() {
            $scope.className = "noscroll";
            if ($scope.className = "noscroll") {
                $scope.className = "scroll";
            } 
            else {
                $scope.className = "noscroll";
            }
        };
        return $scope.score;
    };
	
    //========================================
	// updated for ranking button : 03/14/2024
	//========================================
	
	$scope.checkAndCalculateBankScores = function () {
		var total = $scope.calculateTotal();
        $scope.showBankAlert = total !== 100; // Show alert if total is not 100
        $scope.showme = total === 100;    // Show results if total is 100

        if ($scope.showme) {
            $scope.finalScore(); // Calculate and display scores if total is 100
        }
    };

    $scope.checkAndCalculateFintechScores = function () {
		var total = $scope.calculateTotal2();
        $scope.showFintechAlert = total !== 100; // Show alert if total is not 100
        $scope.showme = total === 100;    // Show results if total is 100

        if ($scope.showme) {
            $scope.finalScore2(); // Calculate and display scores if total is 100
        }
    };

    
	//========================================
	// End of new updates : 03/14/2024
	//========================================

    //================
    // Additional codes for later uses.
    //To make the aleart messages dissapear as soon as the user starts to enter numbers
    // $scope.hideBankAlert = function() {
    //    $scope.showBankAlert = false;
    // };
    // and add the followings code on ratings.html
    // ng-change="hideBankAlert()" ng-blur="reset()"
    // in all the input field such as
    //<input type="text" ng-model="weights.numBranches" ng-change="hideBankAlert()" ng-blur="reset()">
    //<input type="text" ng-model="weights.onlineBankings" ng-change="hideBankAlert()" ng-blur="reset()">
    //03/14/2024
    //================
	
	
	
	
	
	
	//=====================================================
	// James JS Experimenting 
	
	// Fintech: 100 / 16 categories = 6.25 for each category for equal rating 
	// Banks:   100 / 20 categories = 5 for each category for equal Rating
	
	
	// ======
	// Function for calculating DEFAULT FINTECH Ratings automagically
	// ======
	$scope.fintechDef = function () {                          
        $scope.rankingType = "Fintech Name";
		$scope.payPal = [];                                                                            // Defining Variables For Lists
        $scope.applePay = [];
        $scope.googlePay = [];
        $scope.venmo = [];
        $scope.cashApp = [];
        $scope.chime = [];
        $scope.moneyLion = [];
        $scope.zelle = [];

		//console.log($scope.tWeights)

        for (var x = 0; x < techInfo.length; x++) {                                                    // For all variables in the bank info list...
            $scope.score = 0;                                                                          // set score = 0
            for (var score in techInfo[x].bankRatings) {                                               // For the score variable in all the ratings in the specific bank...
                $scope.current = techInfo[x].bankName;                                                 // Grab the bank name
				$scope.score = parseFloat(techInfo[x].bankRatings[score] / 6.25 * 6.25).toFixed(2);  // * another 6.25 to accomodate for balanced weights
                $scope[$scope.current].push($scope.score);                                             
            }
            console.log($scope.current + ": " + $scope[$scope.current]);                                
			//console.log("")
        }

        $scope.oneScore = function (bank) {                                                            
            var total = 0;                                                                             
            for (var y = 0; y < bank.length; y++) {                                                    
                total += parseFloat(bank[y]);
            }
            return total;
			
        };


        $scope.allScores2 = [                                                                            // Create a list for all the scores to be displayed.
            {bankname: 'PayPal', score: parseFloat($scope.oneScore($scope.payPal).toFixed(2))},
            {bankname: 'ApplePay', score: parseFloat($scope.oneScore($scope.applePay).toFixed(2))},
            {bankname: 'GooglePay', score: parseFloat($scope.oneScore($scope.googlePay).toFixed(2))},
            {bankname: 'Venmo', score: parseFloat($scope.oneScore($scope.venmo).toFixed(2))},
            {bankname: 'CashApp', score: parseFloat($scope.oneScore($scope.cashApp).toFixed(2))},
            {bankname: 'Chime', score: parseFloat($scope.oneScore($scope.chime).toFixed(2))},
            {bankname: 'MoneyLion', score: parseFloat($scope.oneScore($scope.moneyLion).toFixed(2))},
            {bankname: 'Zelle', score: parseFloat($scope.oneScore($scope.zelle).toFixed(2))}

        ];
		

    };
	
	
	// This function is for calculating the default bank ratings automagically
	$scope.bankDef = function () {                          
        $scope.rankingType = "Bank Name"; 
		
		// Updated Bank Lists, always make sure it's EXACTLY how the "bankName" appears in the "bankInfo" variable or else it won't work
		$scope.bankOfAmerica = []; 
		$scope.mt = [];
		$scope.capitalOne = [];
		$scope.ridgewoodSavings = [];
		$scope.citibank = [];
		$scope.santander = [];
		$scope.tdBank = [];
		$scope.keyBank = [];
		$scope.citizensBank = [];
		$scope.flagStarNYCB = [];
		$scope.wellsFargo = [];
		$scope.flushingBank = [];
		$scope.communityBank = [];
		$scope.nbtBank = [];
		$scope.websterBank = [];
		$scope.jpMorgan = [];
		$scope.tompkinsBank = [];
		$scope.northwestBank = [];
		$scope.dimeBank = [];
		$scope.valleyBank = [];
		$scope.fiveStarBank = [];
		$scope.canNationalBank = [];
		$scope.berkshireBank = [];
		$scope.applebank = [];
		$scope.trustcoBank = [];
		$scope.chemungTrust = [];
		$scope.firstNationalBank = [];
		$scope.glensFalls = [];


        for (var x = 0; x < bankInfo.length; x++) {                                                    // For all variables in the bank info list...
            $scope.score = 0;                                                                          // set score = 0
            for (var score in bankInfo[x].bankRatings) {                                               // For the score variable in all the ratings in the specific bank...
                $scope.current = bankInfo[x].bankName;                                                 // Grab the bank name
				$scope.score = parseInt(bankInfo[x].bankRatings[score] / 5 * 5);   // DEFAULT VALUE
				$scope[$scope.current].push($scope.score);                                             // ??? Push the current score to the overall score ???
				
            }
            console.log($scope.current + ": " + $scope[$scope.current]);
        }

        $scope.oneScore = function (bank) {
            var total = 0;
            for (var y = 0; y < bank.length; y++) {
                total += parseInt(bank[y]);
            }
			return total;
        };

        $scope.allScores3 = [                                                                            // PRINT OUT ALL THE SCORES
            {bankname: 'Bank of America', score: $scope.oneScore($scope.bankOfAmerica)},
			{bankname: 'M & T', score: $scope.oneScore($scope.mt)},
			{bankname: 'Capital One', score: $scope.oneScore($scope.capitalOne)},
			{bankname: 'Ridgewood Savings Bank', score: $scope.oneScore($scope.ridgewoodSavings)},
			{bankname: 'Citibank', score: $scope.oneScore($scope.citibank)},
			{bankname: 'Santander Bank', score: $scope.oneScore($scope.santander)}, 
			{bankname: 'TD Bank', score: $scope.oneScore($scope.tdBank)},
			{bankname: 'Keybank', score: $scope.oneScore($scope.keyBank)},
			{bankname: 'Citizens Bank', score: $scope.oneScore($scope.citizensBank)},
			{bankname: 'Flagstar Bank', score: $scope.oneScore($scope.flagStarNYCB)},
			{bankname: 'Wells Fargo', score: $scope.oneScore($scope.wellsFargo)},
			{bankname: 'Flushing Bank', score: $scope.oneScore($scope.flushingBank)},
			{bankname: 'Community Bank', score: $scope.oneScore($scope.communityBank)},
			{bankname: 'NBT Bank', score: $scope.oneScore($scope.nbtBank)},
			{bankname: 'Webster Bank', score: $scope.oneScore($scope.websterBank)},
			{bankname: 'JP Morgan', score: $scope.oneScore($scope.jpMorgan)},
			{bankname: 'Tompkins Community Bank', score: $scope.oneScore($scope.tompkinsBank)},
			{bankname: 'Northwest Bank', score: $scope.oneScore($scope.northwestBank)},
			{bankname: 'Dime Community Bank', score: $scope.oneScore($scope.dimeBank)},
			{bankname: 'Valley National Bank', score: $scope.oneScore($scope.valleyBank)},
			{bankname: 'Five Star Bank', score: $scope.oneScore($scope.fiveStarBank)},
			{bankname: 'The Canandaigua National Bank and Trust Company', score: $scope.oneScore($scope.canNationalBank)},
			{bankname: 'Berkshire Bank', score: $scope.oneScore($scope.berkshireBank)},
			{bankname: 'Apple Bank for Savings', score: $scope.oneScore($scope.applebank)},
			{bankname: 'Trustco Bank', score: $scope.oneScore($scope.trustcoBank)},
			{bankname: 'Chemung Canal Trust Company', score: $scope.oneScore($scope.chemungTrust)},
			{bankname: 'The First National Bank of Long Island', score: $scope.oneScore($scope.firstNationalBank)},
            {bankname: 'Glens Falls National Bank and Trust Company', score: $scope.oneScore($scope.glensFalls)} 
        ];
    };
		
	
	
});