export default function UserInfoTable({
  title,
  type,
  size,
  name,
  value,
  onChange,
  checked,
}) {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <input
          type={type ? type : "text"}
          size={size ? size : ""}
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
        />
      </td>
    </tr>
  );
}
