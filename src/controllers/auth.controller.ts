import httpStatus from 'http-status';
import { authService, userService, tokenService } from '../services';
import catchAsync from '../utils/catchAsync';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';

const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser(email, password);
  const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.send({ message: 'Logout successful' });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});


const getMe = catchAsync(async (req, res,) => {
  const user = req.user as User;
  const dbUser = await userService.getMe(user.id);
  if (!dbUser) {
    return res.status(404).send('User not found');
  }
  res.send(user);
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  getMe
};