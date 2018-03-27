
view wallte info 
  1. 隐藏私钥后，右侧的二维码没有隐藏

check tx status
contract - search
  查询失败后需要提示 - 从英文翻译

GetTransactionReceipt 
  1. transaction not found
  2. params eror/system error

senRawTransaction
  1. transaction's nonce is invalid, should bigger than the from's nonce 交易nonce不可用，需要大于from地址的nonce
  2. contract transaction from-address not equal to to-address 发布合约的from/to地址不一致
  3. contract check failed 合约地址无效
  4. duplicated transaction 不能重复提交相同的交易
  5. below the gas price gas 价格太低
  6. gas limit less or equal to 0 
  7. out of gas limit    gasLimit过大
  8. invalid transaction chainID 无效的chainID
  9. invalid transaction hash 无效的交易哈希
  10. invalid transaction signer 无效的交易签名

replace \="([^ =]+)" with =$1

sendNas.html/onClickSendTransaction 最后那 ajax 为啥要等 1 分钟? - otto

http://34.205.26.12:8685/
https://testnet.nebulas.io/
https://github.com/nebulasio/wiki/blob/master/rpc.md

2018.3.19 ~ 2018.3.24
- 主网测试网络切换
- 多语言
- 查询帐号余额 - View Wallet Info 页面有
- 根据交易 hash 查询交易信息（如果交易执行失败，需要提示失败和错误类型）
- 部署和执行合约（JS）

代码段
- header, footer
- select wallet file 在 3 个文件中都使用
删除 js/Blob.js
本地创建的过程在 js/nebulas.js 里, 不支持 webpack 的 require, 有时间提出来, 有时间把 js/nebulas.js 删掉

# web-wallet

Nebulas wallet for the web. Nebulas users can use it to send transactions and submit smart contracts.

Nebulas already has a JavaScript library [neb.js](https://github.com/nebulasio/neb.js) that implements address generation, transaction signing, and submission. Web-wallet can be implemented using this library.

### TODO list

- api server testnet.nebulas.io returns access-control-allow-origin: (origin in request header), when open index.html through file: it's origin is null and in this case chrome disallows js from accessing ajax content, so this api setting needs change
- generate nebulas address/account [done]
- send transaction (NAS & NRC20) [send NAS has done.]
- send offine transaction [done]
- view address/account info [done]
- view transaction status & info
- deploy/call smart contract
- choose nebulas network(Testnet, Mainnet etc.)


Thanks to @luoman for implementing a pre-version [naswallet](https://github.com/nebulasio/explorer/tree/master/nasWallet) for us.

## Contribution

We are very glad that you are considering to help Nebulas Team, including but not limited to source code, documents or others.

If you'd like to contribute, please fork, fix, commit and send a pull request for the maintainers to review and merge into the main code base. If you wish to submit more complex changes though, please check up with the core devs first on our [slack channel](http://nebulasio.herokuapp.com) to ensure those changes are in line with the general philosophy of the project and/or get some early feedback which can make both your efforts much lighter as well as our review and merge procedures quick and simple.

Please refer to our [contribution guideline](https://github.com/nebulasio/wiki/blob/master/contribute.md) for more information.

Thanks.

## License

The go-nebulas project is licensed under the [GNU Lesser General Public License Version 3.0 (“LGPL v3”)](https://www.gnu.org/licenses/lgpl-3.0.en.html).

For the more information about licensing, please refer to [Licensing](https://github.com/nebulasio/wiki/blob/master/licensing.md) page..

