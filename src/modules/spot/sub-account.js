'use strict'

const { validateRequiredParameters } = require('../../lib/validation')
const { Auth } = require('../../lib/utils')

/**
 * Sub-Account Endpoints
 * @module SubAccount
 * @param {*} superclass
 */
const SubAccount = superclass => class extends superclass {
  /**
   * Sub-Account to Main-Account (For Main Account) (SIGNED) <br>
   * Sub-account spot asset transfer to Main-account (For Main Account) <br>
   * POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-main <br>
   * 
   * @param {String} requestNo -  UUID,unique identifier, max length 64
   * @param {String} amount - 	Transfer amount
   * @param {String} currency - Currency
   * @param {String} subAccount - Sub-Account username
   * {@link https://developer-pro.bitmart.com/en/spot/#sub-account-to-main-account-for-main-account-signed}
   */
  subAccountToMainAccountForMainAccount(requestNo, amount, currency, subAccount) {
    validateRequiredParameters({ requestNo, amount, currency, subAccount })

    return this.request(Auth.SIGNED, 'POST', '/account/sub-account/main/v1/sub-to-main', {
      requestNo: requestNo,
      amount: amount,
      currency: currency,
      subAccount: subAccount
    })
  }

  /**
   * Sub-Account to Main-Account (For Sub-Account) (SIGNED) <br>
   * Sub-Account spot asset transfer to Main-Account spot asset (For Sub-Account) <br>
   * POST https://api-cloud.bitmart.com/account/sub-account/sub/v1/sub-to-main <br>
   * 
   * @param {String} requestNo -  UUID,unique identifier, max length 64
   * @param {String} amount - 	Transfer amount
   * @param {String} currency - Currency
   * {@link https://developer-pro.bitmart.com/en/spot/#sub-account-to-main-account-for-main-account-signed}
   */
  subAccountToMainAccountForSubAccount(requestNo, amount, currency) {
    validateRequiredParameters({ requestNo, amount, currency })

    return this.request(Auth.SIGNED, 'POST', '/account/sub-account/sub/v1/sub-to-main', {
      requestNo: requestNo,
      amount: amount,
      currency: currency
    })
  }

  /**
 * Main-Account to Sub-Account (For Main Account) (SIGNED) <br>
 * Main-account spot asset transfer to Sub-account spot asset (For Main Account) <br>
 * POST https://api-cloud.bitmart.com/account/sub-account/main/v1/main-to-sub <br>
 * 
 * @param {String} requestNo -  UUID,unique identifier, max length 64
 * @param {String} amount - 	Transfer amount
 * @param {String} currency - Currency
 * @param {String} subAccount - Sub-Account username
 * {@link https://developer-pro.bitmart.com/en/spot/#main-account-to-sub-account-for-main-account-signed}
 */
  mainAccountToSubAccountForMainAccount(requestNo, amount, currency) {
    validateRequiredParameters({ requestNo, amount, currency })

    return this.request(Auth.SIGNED, 'POST', '/account/sub-account/main/v1/main-to-sub', {
      requestNo: requestNo,
      amount: amount,
      currency: currency,
      subAccount: subAccount
    })
  }

  /**
* Sub-Account to Sub-Account (For Main Account) (SIGNED) <br>
* Sub-Account spot asset transfer to Sub-Account spot asset (For Main Account) <br>
* POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub <br>
* 
* @param {String} requestNo -  UUID,unique identifier, max length 64
* @param {String} amount - 	Transfer amount
* @param {String} currency - Currency
* @param {String} fromAccount - Transfer out Sub-Account username
* @param {String} toAccount - Transfer to Sub-Account username
* {@link https://developer-pro.bitmart.com/en/spot/#sub-account-to-sub-account-for-main-account-signed}
*/
  subAccountToSubAccountForMainAccount(requestNo, amount, currency, fromAccount, toAccount) {
    validateRequiredParameters({ requestNo, amount, currency, fromAccount, toAccount })

    return this.request(Auth.SIGNED, 'POST', '/account/sub-account/main/v1/sub-to-sub', {
      requestNo: requestNo,
      amount: amount,
      currency: currency,
      fromAccount: fromAccount,
      toAccount: toAccount
    })
  }

}

module.exports = SubAccount