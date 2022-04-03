import "../assets/page/login.css";
import { $, $all, setLocal, postAsync } from "./helper/index.ts";
import { BASE_CLIENT_URL, BASE_SERVER_URL } from "./constant/url";

async function login(email, password) {
  return await postAsync(`${BASE_SERVER_URL}/api/user/login`, {
    email,
    password,
  });
}

async function signup(email, password) {
  await postAsync(`${BASE_SERVER_URL}/api/user`, {
    email,
    password,
    status: 0,
  });
}

$all(".message a").forEach((tag) => {
  tag.addEventListener("click", () => {
    $all(".forms").forEach((form) => {
      form.classList.toggle("hidden");
    });
  });
});

$('button[data-submit="signup"]').addEventListener("click", async (event) => {
  event.preventDefault();

  const email = $("#signup-email").value;
  const password = $("#signup-password").value;
  const passwordConfirm = $("#signup-password-confirm").value;

  if (password !== passwordConfirm) return alert("패스워드를 확인해주세요.");
  const regEmail =
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regEmail.test(email)) return alert("옳지 않은 이메일 형식입니다.");

  await signup(email, password);

  alert("회원가입이 완료되었습니다.\n로그인해주세요.");
});

$('button[data-submit="login"]').addEventListener("click", async (event) => {
  event.preventDefault();

  const email = $("#login-email").value;
  const password = $("#login-password").value;

  const data = await login(email, password);
  const { _id, email: userEmail } = data[0];
  alert(`환영합니다, ${userEmail}님!`);
  setLocal("user_token", _id);
  location.replace(BASE_CLIENT_URL);
});
