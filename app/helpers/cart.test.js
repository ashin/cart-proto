import chai, { expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);

import { deepishCopyCartItems, addTwoPrices, addItem, totalItems } from './cart';

describe("cart helper", function() {
  it("deepishCopyCartItems", function() {
    it("should perform a deep copy", function() {
        const cartItems = {
            item: {
                price: 1,
                count: 1,
                id: 'item',    
            }
        }
        const clonedCartItems = deepishCopyCartitems(cartItems);
        clonedCartItems.item.count = 3;

        expect(cartItems.item.count).to.equal(1);
    });
    it("should be a proper copy", function() {
        const cartItems = {
            item: {
                price: 1,
                count: 1,
                id: 'item',    
            },
            itemtwo: {
                price: 2,
                count: 2,
                id: 'itemtwo',    
            }
        }
        const clonedCartItems = deepishCopyCartitems(cartItems);
        
        expect(JSON.stringify(cartItems)).to.equal(JSON.stringify(clonedCartItems));
    });    
  });

  it("addTwoPrices", function() {
    expect(addTwoPrices(11.11, 22.22)).to.equal(33.33);
    expect(addTwoPrices(999.1, 1.00)).to.equal(1000.10);
  });

  it("addItem", function() {
    it("should start a new item with 1 count", function() {
        const cart = {
            item: {
                price: 1,
                count: 1,
                id: 'item',    
            }
        };
        const newItem = {
            id: 'itemtwo',
            price: 2,
        }
        const newCart = addItem(cart, newItem);
        expect(newCart.item.count).to.equal(1);
        expect(newCart.itemtwo.count).to.equal(1);
    });
    it("increase item count if the same type", function() {
        const cart = {
            item: {
                price: 1,
                count: 1,
                id: 'item',    
            }
        };
        const newItem = {
            id: 'item',
            price: 1,
        }
        const newCart = addItem(cart, newItem);
        expect(newCart.item.count).to.equal(2);
        expect(Object.keys(newCart).length).to.equal(1);
    });
  });

  it("totalItems", function() {
    const cart = {
        item: {
            price: 5.00,
            count: 3,
            id: 'item',    
        }
    };
    const deals = [{
        rule: function(cartItems, reducedItems) {
            //not our place to test rule
            return reducedItems;
        }
    }];

    expect(totalItems(cart, deals)).to.equal(15.00);
    
    cart.newItem = {
        price: 10.00,
        count: 2,
        id: 'newItem',
    };

    expect(totalItems(cart, deals)).to.equal(35.00);
    
  });
});