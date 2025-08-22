import * as userModel from '../model/userModel.js';
import * as orderView from '../view/orderView.js';
export function init() {
  orderView.render(userModel.getCurrentUser().orders);
}
