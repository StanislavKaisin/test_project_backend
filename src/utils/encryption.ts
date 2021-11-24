import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

export const hashPassword = async (
  password: string,
  saltOrRounds = 10,
): Promise<string> => await bcrypt.hash(password, saltOrRounds);

export const isMatch = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
