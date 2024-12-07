export default function Filter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="filter">filter shown with</label>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </div>
  );
}
