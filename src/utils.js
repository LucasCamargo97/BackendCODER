import faker from 'faker'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const filename= fileURLToPath(import.meta.url);
export const __dirname = dirname(filename);

export const authMiddleware = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message:"NO AUTORIZADO"})
    else next();
}

export const generate = (quantity) => {
  const arr = []

  for (let i = 0; i < quantity; i++) {
    arr.push({
      id: i + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.image()
    }
    )
  }
  return arr
}
