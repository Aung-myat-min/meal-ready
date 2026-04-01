import { compareSync, genSaltSync, hashSync } from "bcrypt-ts";

const salt = genSaltSync(10);

export default class PasswordUtils {
  static async hash(password: string): Promise<string> {
    return hashSync(password);
  }

  static async compare({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return compareSync(password, hash);
  }
}
