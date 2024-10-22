// Interface para a resposta da API
interface LoginResponse {
  token: string;
}

// Interface para o usuário
interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const togglePasswordButton = document.getElementById(
    'toggle-password'
  ) as HTMLButtonElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const emailError = document.getElementById('email-error') as HTMLElement;
  const passwordError = document.getElementById(
    'password-error'
  ) as HTMLElement;
  const loginError = document.getElementById('login-error') as HTMLElement;

  // Função para validar o email
  function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Alternar visibilidade da senha ao clicar no botão
  togglePasswordButton.addEventListener('click', () => {
    const isPasswordVisible = passwordInput.type === 'password';
    passwordInput.type = isPasswordVisible ? 'text' : 'password';

    // Alterar o texto do botão dinamicamente
    togglePasswordButton.textContent = isPasswordVisible ? 'Ocultar' : 'Mostrar';
  });

  // Manipulação do envio do formulário
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Resetar mensagens de erro
    emailError.textContent = '';
    passwordError.textContent = '';
    loginError.textContent = '';

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let hasError = false;

    // Validação do email
    if (!email) {
      emailError.textContent = 'O email é obrigatório.';
      hasError = true;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Formato de email inválido.';
      hasError = true;
    }

    // Validação da senha
    if (!password) {
      passwordError.textContent = 'A senha é obrigatória.';
      hasError = true;
    }

    if (hasError) return;

    try {
      // Obter a lista de usuários
      const usersResponse = await fetch('https://fakestoreapi.com/users');
      const usersData: User[] = await usersResponse.json();

      // Encontrar o usuário com o email fornecido
      const user = usersData.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        loginError.textContent = 'Usuário não encontrado.';
        return;
      }

      // Verificar se a senha corresponde
      if (user.password !== password) {
        loginError.textContent = 'Senha incorreta.';
        return;
      }

      // Autenticação com a API Fake Store
      const authResponse = await fetch(
        'https://fakestoreapi.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        }
      );

      const authData: LoginResponse = await authResponse.json();

      if (authResponse.ok && authData.token) {
        // Armazenar o token e redirecionar
        sessionStorage.setItem('authToken', authData.token);
        sessionStorage.setItem('username', user.username );
        window.location.href = '/productListing.html';
      } else {
        loginError.textContent = 'Falha na autenticação. Tente novamente.';
      }
    } catch (error) {
      loginError.textContent =
        'Ocorreu um erro ao efetuar o login. Tente novamente mais tarde.';
      console.error('Erro:', error);
    }
  });
});
