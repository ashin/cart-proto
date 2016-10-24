import chai, { expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);

import { buildNForM, buildTypeDiscount, buildTypeDiscountWithMinimum } from './deals';

describe("deal helper", function() {
    it("buildNForM should update discounted cart", function() {
        const cartItems = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const cartItemsToPayFor = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const nForM = buildNForM(3, 2, 'item');
        const discountedCartItems = nForM(cartItems, cartItemsToPayFor);
        expect(discountedCartItems.item.count).to.equal(4);
    });
    it("buildNForM shouldnt update discounted cart", function() {
        const cartItems = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const cartItemsToPayFor = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const nForM = buildNForM(6, 4, 'item');
        const discountedCartItems = nForM(cartItems, cartItemsToPayFor);
        expect(discountedCartItems.item.count).to.equal(5);
    });
    it("buildTypeDiscount", function() {
        const cartItems = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const cartItemsToPayFor = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const typeDiscount = buildTypeDiscount(3, 'item');
        const discountedCartItems = typeDiscount(cartItems, cartItemsToPayFor);
        expect(discountedCartItems.item.price).to.equal(3);
    });

    it("buildTypeDiscountWithMinimum shouldnt update", function() {
        const cartItems = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const cartItemsToPayFor = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const typeDiscount = buildTypeDiscountWithMinimum(3, 'item', 6);
        const discountedCartItems = typeDiscount(cartItems, cartItemsToPayFor);
        expect(discountedCartItems.item.price).to.equal(10);
    });
    it("buildTypeDiscountWithMinimum should update", function() {
        const cartItems = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const cartItemsToPayFor = {
            item: {
                price: 10,
                count: 5,
                id: 'item',    
            },
            itemtwo: {
                price: 20,
                count: 10,
                id: 'itemtwo',    
            }
        };
        const typeDiscount = buildTypeDiscountWithMinimum(3, 'itemtwo', 9);
        const discountedCartItems = typeDiscount(cartItems, cartItemsToPayFor);
        expect(discountedCartItems.itemtwo.price).to.equal(3);
    });
});