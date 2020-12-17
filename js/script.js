// Register modal component
Vue.component("modal", {
    template: "#modal-template"
});

var app = new Vue({
    el: "#app",
    data: {
        books: [{
                id: "0001",
                name: "Harry Potter 1 แฮร์รี่ พอตเตอร์ 1 กับศิลาอาถรรพ์",
                price: "100"
            },
            {
                id: "0002",
                name: "Harry Potter 2 แฮร์รี่ พอตเตอร์ 2 กับห้องแห่งความลับ",
                price: "100"
            },
            {
                id: "0003",
                name: "Harry Potter 3 แฮร์รี่ พอตเตอร์ 3 กับนักโทษแห่งอัซคาบัน",
                price: "100"
            },
            {
                id: "0004",
                name: "Harry Potter 4 แฮร์รี่ พอตเตอร์ 4 กับถ้วยอัคนี",
                price: "100"
            },
            {
                id: "0005",
                name: "Harry Potter 5 แฮร์รี่ พอตเตอร์ 5 กับภาคีนกฟีนิกซ์",
                price: "100"
            },
            {
                id: "0006",
                name: "Harry Potter 6 แฮร์รี่ พอตเตอร์ 6 กับเจ้าชายเลือดผสม",
                price: "100"
            },
            {
                id: "0007",
                name: "Harry Potter 7 แฮร์รี่ พอตเตอร์ กับเครื่องรางยมฑูต",
                price: "100"
            }
        ],
        itemData: [],
        addModal: false,
        editModal: false,
        currentIndex: 0,
        currentName: "",
        currentPrice: "",
        currentAmount: "",
        selectIndex: { value: -1 },
        total: 0,
        net: 0
    },
    methods: {
        onSelected: function() {
            this.currentName = this.books[this.selectIndex.value].name;
            this.currentPrice = this.books[this.selectIndex.value].price;
        },

        addItem: function() {
            var name_box = this.$refs["itemSelect"].value;
            var price_box = this.$refs["itemPrice"].value;
            var amount_box = this.$refs["itemAmount"].value;

            if (this.isEmpty(name_box, price_box, amount_box)) {
                if (this.isNumber(price_box) && this.isNumber(amount_box)) {
                    this.itemData.push({
                        id: this.books[this.selectIndex.value].id,
                        name: this.books[this.selectIndex.value].name,
                        price: this.books[this.selectIndex.value].price,
                        amount: amount_box
                    });

                    this.updateTotal();

                    //Clear box
                    this.$refs["itemPrice"].value = "";
                    this.$refs["itemAmount"].value = "";

                    alert("Add successfully.")
                    this.closeModal("add");

                    //Clear
                    this.currentName = "";
                    this.currentPrice = "";
                    this.currentAmount = "";
                } else {
                    alert("Error : Please enter only number in this field.");
                }
            } else {
                alert("Error : Please enter fill.");
            }
        },

        editItem: function(index) {
            this.currentIndex = index;
            this.currentName = this.itemData[index].name;
            this.currentPrice = this.itemData[index].price;
            this.currentAmount = this.itemData[index].amount;

            this.showModal("edit");
        },

        confirmEdit: function() {
            var index = this.currentIndex;

            var name_box = this.books[this.selectIndex.value].name;
            var price_box = this.books[this.selectIndex.value].price;
            var amount_box = this.$refs["itemEditAmount"].value;

            if (this.isEmpty(name_box, price_box, amount_box)) {
                if (this.isNumber(price_box) && this.isNumber(amount_box)) {
                    this.itemData[index].id = this.books[this.selectIndex.value].id;
                    this.itemData[index].name = name_box;
                    this.itemData[index].price = price_box;
                    this.itemData[index].amount = amount_box;

                    this.updateTotal();

                    alert("Edit successfully.");
                    this.closeModal("edit");

                    //Clear
                    this.currentIndex = 0;
                    this.currentName = "";
                    this.currentPrice = "";
                    this.currentAmount = "";
                } else {
                    alert("Error : Please enter only number in this field.");
                }
            } else {
                alert("Error : Please enter fill.");
            }
        },

        delItem: function(index) {
            if (confirm("Are you sure to delete this item?")) {
                this.itemData.splice(index, 1);

                this.updateTotal();
            }
        },

        showModal: function(mode) {
            if (mode == "add") {
                this.selectIndex.value = -1
                this.addModal = true;
            } else if (mode == "edit") {
                //Get Current Item Index
                this.books.forEach((item, index) => {
                    if (item.id === this.itemData[this.currentIndex].id) {
                        this.selectIndex.value = index;
                    }
                });

                this.editModal = true;
            }
        },

        closeModal: function(mode) {
            if (mode == "add") {
                this.addModal = false;
            } else if (mode == "edit") {
                this.editModal = false;
            }

            //Clear
            this.currentName = "";
            this.currentPrice = "";
            this.currentAmount = "";
        },

        updateTotal: function() {
            var sum = 0;

            this.itemData.forEach((item) => {
                sum += parseInt(item.price) * parseInt(item.amount);
            });

            this.$refs["total"].innerHTML = sum.toLocaleString();
            this.total = sum;
        },

        isNumber: function(number) {
            return !isNaN(number);
        },

        isEmpty: function(text1, text2, text3) {
            return (text1 !== "" && text2 !== "" && text3 !== "")
        },

        getMin: function(dataSet) {
            var min = dataSet[0].amount;

            dataSet.forEach((item, index) => {
                if (parseInt(item.amount) < min) {
                    min = parseInt(item.amount);
                }
            });

            return min;
        },

        getMax: function(dataSet) {
            var max = dataSet[0].amount;;

            dataSet.forEach((item, index) => {
                if (parseInt(item.amount) > max) {
                    max = parseInt(item.amount);
                }
            });

            return max;
        },

        getMinIndex: function(dataSet) {
            var min = dataSet[0].amount;;
            var minIndex = 0;

            dataSet.forEach((item, index) => {
                if (parseInt(item.amount) < min) {
                    min = parseInt(item.amount);
                    minIndex = index;
                }
            });

            return minIndex;
        },

        getMaxIndex: function(dataSet) {
            var max = dataSet[0].amount;;
            var maxIndex = 0;

            dataSet.forEach((item, index) => {
                if (parseInt(item.amount) > max) {
                    max = parseInt(item.amount);
                    maxIndex = index;
                }
            });

            return maxIndex;
        },

        calcPromo: function() {
            //Check Amount of Data
            if (this.itemData.length < 1) {
                this.$refs["discount"].innerHTML = "0";
                this.$refs["nettotal"].innerHTML = "0";

                return;
            }

            var uniqueID = []
            var uniqueList = [];
            var promoDiscount = 0;
            var discount = 0;

            //Get Unique Data
            this.itemData.forEach((item, index) => {
                if (!uniqueID.includes(item.id)) {
                    uniqueID.push(item.id);

                    //Push with Object because If push with OBJECT It will reference.
                    uniqueList.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        amount: item.amount
                    });
                } else {
                    index = uniqueID.findIndex((elem) => elem === item.id);

                    uniqueList[index].amount = parseInt(uniqueList[index].amount) + parseInt(item.amount);
                }
            });

            //Get Discount
            switch (uniqueID.length) {
                case 2:
                    promoDiscount = 0.1;
                    break;
                case 3:
                    promoDiscount = 0.2;
                    break;
                case 4:
                    promoDiscount = 0.3;
                    break;
                case 5:
                    promoDiscount = 0.4;
                    break;
                case 6:
                    promoDiscount = 0.5;
                    break;
                case 7:
                    promoDiscount = 0.6;
                    break;
            }

            //Minimum Round
            var round = this.getMin(uniqueList);

            for (var i = 0; i < round; i++) {
                var tmp = 0;

                uniqueList.forEach((item) => {
                    tmp += parseInt(item.price);
                });

                //Other Way
                //discount += (100 * uniqueID.length) * promoDiscount;
                discount += tmp * promoDiscount;
            }

            this.net = this.total - discount;
            this.$refs["discount"].innerHTML = `${discount.toLocaleString()} (${promoDiscount * 100}%)`;
            this.$refs["nettotal"].innerHTML = this.net.toLocaleString();
        }
    }
});