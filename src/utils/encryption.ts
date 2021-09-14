import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hash = async (
  password: string,
  saltOrRounds = 10,
): Promise<string> => await bcrypt.hash(password, saltOrRounds);

export const isMatch = async (password: string, hash: string) => {
  const heshedPassword = await bcrypt.hash(password, saltOrRounds);
  return await bcrypt.compare(heshedPassword, hash);
};
