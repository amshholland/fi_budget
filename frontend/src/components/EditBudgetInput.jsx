export const Inputs = {
  categoryType:
    <select className="categoryType">
      <option value="none" selected disabled hidden>Select</option>
      <option value="Income">Income</option>
      <option value="Bill">Bill</option>
      <option value="Expense">Expense</option>
    </select>,
  catgory:
    <input type="text" />,
  amount:
    <><>$</><input type="number" min="0.01" step="0.01" placeholder="0.00" /></>,
  date:
    <input type="date" />
};