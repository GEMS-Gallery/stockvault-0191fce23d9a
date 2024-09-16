export const idlFactory = ({ IDL }) => {
  const Stock = IDL.Record({
    'name' : IDL.Text,
    'quantity' : IDL.Float64,
    'price' : IDL.Float64,
    'symbol' : IDL.Text,
  });
  return IDL.Service({
    'addOrUpdateStock' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Float64, IDL.Float64],
        [],
        [],
      ),
    'getAllStocks' : IDL.Func([], [IDL.Vec(Stock)], ['query']),
    'getStock' : IDL.Func([IDL.Text], [IDL.Opt(Stock)], ['query']),
    'getTotalPortfolioValue' : IDL.Func([], [IDL.Float64], ['query']),
    'removeStock' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
