four51.app.controller('AwardsCtrl', ['$scope', '$location', '$sce', 'User', 'SpendingAccount', 'Order', 'Address', 'GiftCard', 'ProductDisplayService', '$window', '$cookieStore',
    function ($scope, $location, $sce, User, SpendingAccount, Order, Address, GiftCard, ProductDisplayService, $window, $cookieStore) {
            if (store.get('451Cache.Order')) {
                $scope.Order = store.get('451Cache.Order');
                $scope.LineItem = store.get('451Cache.LineItem');
            }
            else {
                $scope.Order = {};
                $scope.Order.LineItems = [];
                $scope.LineItem = {};
                $scope.Order.BudgetAccount = {};
                $scope.Order.ShipAddress = { Country: 'US', IsShipping: true, IsBilling: false };
            }

        function setupOrder() {
            $scope.Order.BudgetAccountID = $scope.BudgetAccount.ID;
            $scope.Order.PaymentMethod = 'BudgetAccount';
            store.set('451Cache.Order', $scope.Order);
            store.set('451Cache.LineItem', $scope.LineItem);
        }

        function saveOrder() {
            $scope.Order.LineItems.push($scope.LineItem);
            $scope.Order.ExternalOrderDetailRecipients = $scope.user.Email;
            var randomPassword = Math.random();
            var user = {
                FirstName: 'Temp',
                LastName: 'User',
                Email: 'demomail@four51.com',
                Username: Math.random(),
                Password: randomPassword,
                ConfirmPassword: randomPassword,
                Active: true,
                TermsAccepted: '2013-05-29T11:47:51.403',
                ConvertFromTempUser: true
            };
            User.save(user, function(u) {
                $scope.Order.FromUserID = u.ID;
                Order.submit($scope.Order,
                    function (data) {
                        $scope.Order = data;
                        store.remove('451Cache.Order');
                        store.remove('451Cache.LineItem');
                    },
                    function (ex) {
                        $scope.error = ex.Message;
                    }
                );
            });
        }

        $scope.redeemGiftCard = function() {
            $scope.gettingAward = true;
            $scope.error = null;
            GiftCard.redeem(this.giftcard,
                function(card) {
                    $scope.giftcard = card;
                    SpendingAccount.query(function(data) {
                        $scope.BudgetAccount = data[data.length - 1];
                        ProductDisplayService.getProductAndVariant($scope.BudgetAccount.AccountType.Name, null, function(data){
                            $scope.LineItem.Product = data.product;
                            ProductDisplayService.setNewLineItemScope($scope);
                            ProductDisplayService.setProductViewScope($scope);
                            $scope.LineItem.Quantity = 1;
                            $scope.LineItem.LineTotal = 10;
                            setupOrder();
                            $scope.gettingAward = false;
                        });
                    });
                },
                function(ex) {
                    $scope.error = ex.Message;
                    $scope.gettingAward = false;
                }
            );
        };


        $scope.$on('event:AddressSaved', function(event, address) {
            $scope.Order.ShipAddressID = address.ID;
            $scope.LineItem.ShipAddressID = address.ID;
            saveOrder();
        });
        //Clear the Cache
        if($scope.Four51User.currentUser) {
            if ($scope.Four51User.currentUser.FirstName == 'Temp') {
                $cookieStore.remove('user.PC');
                $window.location.href= $window.location.pathname;
            }
        }
    }]);