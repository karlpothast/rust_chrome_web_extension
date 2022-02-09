"use strict";
var wasmFilePath = './plugin.wasm';
var wasm_memory;
const coinGeckoId = 'olympus';
var coinGeckoResp;

const initialize = async () => {
  try {
    var importObject = {
      env: {
        renderHTML: () => 
        {
          populateHTML();
        }
      }
    };

    const wasm = await getWebAssembly();

    async function getWebAssembly(){
      fetch(wasmFilePath)
      .then(async response => {
          if (!response.ok) {
            if (response.status == '404'){
              throw new Error('WASM file not found <br/> Path : ' + wasmFilePath);
            }
          }
          else{
            const isWASM = response.headers.get('content-type')?.includes('application/wasm');
            if (!isWASM){
              throw new Error('File specified is not a valid web assembly file <br/> Path : ' + mod_path);
            }
            else {         
              WebAssembly.instantiateStreaming(response, importObject)
              .then(results => {
                wasm_memory = results.instance.exports.memory;
                results.instance.exports.start();
              });
            }
          }
      })
      .catch(error => {
        console.log(error);
        return error;
      });
    }
 
    async function populateHTML() {
      try {

        coinGeckoResp = await getCoinData(coinGeckoId);

        var json0 = coinGeckoResp;
        var _symbol = json0["symbol"];
        var _name = json0["name"];
        var _asset_platform_id = json0["asset_platform_id"];
        var j1_links = json0["links"];
        var _homepage = j1_links["homepage"];
        _homepage = String(_homepage).replace(",,","");
        var j1_image = json0["image"];
        var _imageSrc = j1_image["small"];
        var _marketCapRank = json0["market_cap_rank"];
        var j1_market_data = json0["market_data"];
        var j2_current_price = j1_market_data["current_price"];
        var _marketPriceUSD = j2_current_price["usd"];
        var _priceChangePct24h = j1_market_data["price_change_percentage_24h"];
        var _24hr_pctChange_positive_or_negative = '+';
        var _24hr_pctChange_fontColor = 'green';
        if (_priceChangePct24h < 0) {
          _24hr_pctChange_positive_or_negative = ''; 
          _24hr_pctChange_fontColor = 'red';
        }
        var j2_priceChangePct1Hr = j1_market_data["price_change_percentage_1h_in_currency"];
        var _priceChangePct1Hr = j2_priceChangePct1Hr["usd"];
        var _1hr_pctChange_positive_or_negative = '+';
        var _1hr_pctChange_fontColor = 'green';
        if (_priceChangePct1Hr < 0) {
          _1hr_pctChange_positive_or_negative = ''; 
          _1hr_pctChange_fontColor = 'red';
        }
        var j2_total_volume = j1_market_data["total_volume"];
        var _totalVolumeUSD = j2_total_volume["usd"];
        _totalVolumeUSD = _totalVolumeUSD.toLocaleString("en-US");
        var j2_low_24h = j1_market_data["low_24h"];
        var _low24h = j2_low_24h["usd"];
        var j2_high_24h = j1_market_data["high_24h"];
        var _high24h = j2_high_24h["usd"];
    
        //-----------------------------------
        // fill html element values
        //-----------------------------------
    
        var span_price_section = document.getElementById("span_price_section");
        span_price_section.innerText = "current price";

        var span_24hr_range_header = document.getElementById("span_24hr_range_header");
        span_24hr_range_header.innerText = "last 24 hours : ";

        var span_1hr_label = document.getElementById("span_1hr_label");
        span_1hr_label.innerText = "last hour : ";

        var span_coin_gecko = document.getElementById("span_coin_gecko");
        span_coin_gecko.innerHTML = "Powered by <a href=\"https://www.coingecko.com/en/coins/olympus\" target=\"_blank\">CoinGecko</a>";

        var hr1 = document.getElementById("hr1");
        hr1.style.visibility = "visible";

        var hr2 = document.getElementById("hr2");
        hr2.style.visibility = "visible";

        var htmlTableCoinInfo = document.getElementById("htmlTableCoinInfo");
        var span_imageSrc = document.getElementById("span_imageSrc");
        span_imageSrc.innerHTML = "<img src='" + _imageSrc + "' />";

        var span_name = document.getElementById("span_name");
        span_name.style.fontFamily = "VectisW01-Regular, Oxygen, Trebuchet MS";
        span_name.style.fontSize = "28pt";
        span_name.innerText = _name;
    
        var span_rank = document.getElementById("span_rank");
        span_rank.style.fontFamily = "VectisW01-Regular, Oxygen, Trebuchet MS";
        span_rank.style.fontSize = "28pt";
        span_rank.innerText = "#" + _marketCapRank;
    
        var span_homepage = document.getElementById("span_homepage");
        span_homepage.style.fontFamily = "Oxygen, Arial, Trebuchet MS";
        span_homepage.style.fontSize = "12pt";
        span_homepage.innerHTML = "<a href='" + _homepage + "' target='_blank'>" + _homepage + "</a>";
    
        var span_current_price = document.getElementById("span_current_price");
        span_current_price.style.fontFamily = "VectisW01-Regular, Trebuchet MS, Oxygen";
        span_current_price.style.fontSize = "48pt";
        span_current_price.innerText = '$' + _marketPriceUSD.toFixed(2);
    
        var span_24hr_range = document.getElementById("span_24hr_range");
        span_24hr_range.style.fontFamily = "VectisW01-Regular, Oxygen, Trebuchet MS";
        span_24hr_range.style.fontSize = "16pt";
        span_24hr_range.innerHTML = "<br/> low : $" + _low24h.toFixed(2) + 
                            "<br/> high : $" +_high24h.toFixed(2) + "<br/> overall change : ";
    
        var span_priceChangePct24h = document.getElementById("span_priceChangePct24h");
        span_priceChangePct24h.style.fontFamily = "VectisW01-Regular, Trebuchet MS, Oxygen";
        span_priceChangePct24h.style.fontSize = "20pt";
        span_priceChangePct24h.innerText = _24hr_pctChange_positive_or_negative + _priceChangePct24h.toFixed(1) + "%";
        span_priceChangePct24h.style.color = _24hr_pctChange_fontColor;
    
        var span_1hr = document.getElementById("span_1hr");
        span_1hr.style.fontFamily = "VectisW01-Regular, Oxygen, Trebuchet MS";
        span_1hr.style.fontSize = "16pt";
        span_1hr.innerText = _1hr_pctChange_positive_or_negative + _priceChangePct1Hr.toFixed(1) + "%";
        span_1hr.style.color = _1hr_pctChange_fontColor;

      } catch (error) {
        console.log(error);
      }
    }

    async function getCoinData(coinGeckoId) {
      try {
        var requestUri;
        requestUri = 'https://api.coingecko.com/api/v3/coins/' + coinGeckoId + '?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
        let resp = await fetch(requestUri);
        return await resp.json();
      } catch (error) {
        console.log(error);
      }
    }

  } catch (error) {
        console.log(error);
      return error;
  }
}

window.addEventListener('DOMContentLoaded', initialize);