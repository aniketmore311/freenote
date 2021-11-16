import 'make-promises-safe';
import { Note } from '../models/Note';
import { User } from '../models/User';

async function main() {
  const user = await User.create({
    email: "hello@gmail.com",
    firstname: "aniket",
    lastname: "more",
    password: "pass123",
    role: "user"
  })
}
main();