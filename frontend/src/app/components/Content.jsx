export default function Content({ children }) {
  return (
    <div id="Content">
      {/* 
      <ul class="messages">
        <li
        // th:each="message : ${messages}"
        // th:class="${message.type}"
        // th:text="${message.text}"
        ></li>
      </ul>
      */}

      <section>{children}</section>
    </div>
  );
}
