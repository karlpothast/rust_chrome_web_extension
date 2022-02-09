# olympus_dao_web_extension
An Olympus DAO ticker extension using Rust and WASM

![alt text](https://raw.githubusercontent.com/karlpothast/olympus_dao_web_extension/master/olympusExPreview.png) 

* I've only uploaded the built version for now because as of now (2/8/2022) Google requires manifest 3 for all new extensions if you want to publish to the store.
WASM does not currently work on manifest 3 so the code here is manifest 2 until manifest 3 supports WASM.  You can get it to work by using experimetnal flags and a beta Chrome release but that won't work for consumers.  I will be working on a Rust/WASM build version as soon as these things get ironed out.

* This extension is approximately the same size as MetaMask (450w x 750h). It executes JavaScript from the WASM file generated with Rust. It gets its data from the Coin Gecko API.

* I plan to add rebase data to the UI and have WASM process the CSS as well.  Then we can compare performance and resource usage of this version to the JS and CSS only version on the store currently :
https://chrome.google.com/webstore/detail/olympus-dao-price-ticker/mhhponffbhefikoiafdagegpdfnmpecc

References :
https://bugs.chromium.org/p/chromium/issues/detail?id=1173354

https://groups.google.com/a/chromium.org/g/chromium-extensions/c/zVaQo3jpSpw/m/932YZv2UAgAJ

https://developer.chrome.com/blog/mv2-transition/

