import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Text "mo:base/Text";

actor StockHolding {
  type Stock = {
    symbol: Text;
    name: Text;
    quantity: Float;
    price: Float;
  };

  private stable var stockEntries : [(Text, Stock)] = [];
  private var stockHoldings = HashMap.HashMap<Text, Stock>(10, Text.equal, Text.hash);

  system func preupgrade() {
    stockEntries := Iter.toArray(stockHoldings.entries());
  };

  system func postupgrade() {
    stockHoldings := HashMap.fromIter<Text, Stock>(stockEntries.vals(), 10, Text.equal, Text.hash);
  };

  public func addOrUpdateStock(symbol: Text, name: Text, quantity: Float, price: Float) : async () {
    let stock : Stock = {
      symbol = symbol;
      name = name;
      quantity = quantity;
      price = price;
    };
    stockHoldings.put(symbol, stock);
  };

  public func removeStock(symbol: Text) : async () {
    stockHoldings.delete(symbol);
  };

  public query func getAllStocks() : async [Stock] {
    Iter.toArray(stockHoldings.vals())
  };

  public query func getTotalPortfolioValue() : async Float {
    var total : Float = 0;
    for (stock in stockHoldings.vals()) {
      total += stock.quantity * stock.price;
    };
    total
  };
}
