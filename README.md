# olympus_dao_web_extension
An Olympus DAO ticker extension using Rust and WASM

![alt text](https://raw.githubusercontent.com/karlpothast/olympus_dao_web_extension/master/olympusExPreview.png) 

* I've only uploaded the built version for now because as of now (2/8/2022) Google requires manifest 3 for all new extensions if you want to publis to the store.
WASM does not currently work on manifest 3 so the code here is manifest 2 until manifest 3 supports WASM.  You can get it to work by using experimetnal flags and a beta Chrome release but that won't work for consumers.  I will be working on a Rust/WASM build version as soon as these things get ironed out.

* This extension is approximately the same size as MetaMask (450 x 750) and executes JavaScript to get data from CoinGeckoAPI from the WASM file generated with Rust.

* I plan to add rebase data to the UI and will have WASM process the CSS as well.  Then we can compare to the JS and CSS only version on the store currently :
https://chrome.google.com/webstore/detail/olympus-dao-price-ticker/mhhponffbhefikoiafdagegpdfnmpecc
