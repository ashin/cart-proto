import { v4 } from 'node-uuid';
import * as deals from './deals';

const standardDeals = [{
    rule: deals.buildFreeMembershipDiscount(10),
    id: v4(),
    text: 'Buy 10 ads and recieve free membership',
}];
const fakeDB = {
    companies: [
        {
            id: v4(),
            name: 'Default',
            deals: [
                ...standardDeals,
            ],
        },
        {
            id: v4(),
            name: 'Unilever',
            deals: [
                ...standardDeals,
                {
                    rule: deals.buildNForM(3, 2, 'classic'),
                    id: v4(),
                    text: 'Gets a for 3 for 2 deal on Classic Ads',
                },
            ],
        },
        {
            id: v4(),
            name: 'Apple',
            deals: [{
                rule: deals.buildTypeDiscount(299.99, 'standout'),
                id: v4(),
                text: 'Gets a discount on Standout Ads where the price drops to $299.99 per ad',
            }],
        },
        {
            id: v4(),
            name: 'Nike',
            deals: [{
                rule: deals.buildTypeDiscountWithMinimum(379.99, 'premium', 4),
                id: v4(),
                text: 'Gets a discount on Premium Ads when 4 or more​ are purchased. The price drops to $379.99 per ad',
            }],
        },
        {
            id: v4(),
            name: 'Ford',
            deals: [{
                rule: deals.buildNForM(3, 2, 'classic'),
                id: v4(),
                text: 'Gets a 5 for 4 deal on Classic Ads',
            },
            {
                rule: deals.buildTypeDiscount(309.99, 'standout'),
                id: v4(),
                text: 'Gets a discount on Standout Ads where the price drops to $309.99 per ad',
            },
            {
                rule: deals.buildTypeDiscountWithMinimum(309.99, 'standout', 3),
                id: v4(),
                text: 'Gets a discount on Premium Ads when 3 or more​ are purchased. The price drops to $389.99 per ad',
            }],
        }
    ],
    ads: [
        {
            id: 'classic',
            name: 'Classic Ad',
            price: 269.99
        },
        {
            id: 'standout',
            name: 'Standout Ad',
            price: 322.99
        },
        {
            id: 'premium',
            name: 'Premium Ad',
            price: 394.99
        },
        {
            id: 'membership',
            name: 'Membership',
            price: 99.00
        },
    ],
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default fakeDB;

export const addTodo = text => delay(150).then(() => {
    const todo = {
        text,
        completed: false,
        id: v4()
    };
    fakeDB.todos.push(todo);
    return todo;
});

export const toggleTodo = id => delay(150).then(() => {
    const todo = fakeDB.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
});



export const fetchCompanies = () => delay(150).then(() => fakeDB.companies);
export const fetchAds = () => delay(150).then(() => fakeDB.ads);
