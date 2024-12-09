//
// {
//     "id": "bitcoin",
//     "symbol": "btc",
//     "name": "Bitcoin",
//     "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//     "current_price": 69884,
//     "market_cap": 1381815072910,
//     "market_cap_rank": 1,
//     "fully_diluted_valuation": 1467185645114,
//     "total_volume": 39425003418,
//     "high_24h": 70131,
//     "low_24h": 66854,
//     "price_change_24h": 1566,
//     "price_change_percentage_24h": 2.29223,
//     "market_cap_change_24h": 30637339802,
//     "market_cap_change_percentage_24h": 2.26745,
//     "circulating_supply": 19778081,
//     "total_supply": 21000000,
//     "max_supply": 21000000,
//     "ath": 73738,
//     "ath_change_percentage": -5.18308,
//     "ath_date": "2024-03-14T07:10:36.635Z",
//     "atl": 67.81,
//     "atl_change_percentage": 103007.31632,
//     "atl_date": "2013-07-06T00:00:00.000Z",
//     "roi": null,
//     "last_updated": "2024-11-05T15:16:38.058Z"
// }
export type TCrypto = {
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: null | number;
    last_updated: string;
};