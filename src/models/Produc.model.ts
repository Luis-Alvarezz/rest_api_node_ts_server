// ! DECORADORES:
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({ // * Decorador de Table
  tableName: 'product'
})

// ! Model - Es una Clase que podemos Heredar y en esa clase reescribir y definir nuestros modelos
class Product extends Model {
  // * El ID normalmente lo otogan las DB
  // @Column // ! Decorador campo 2 de DB
  @Column({
    // ! Configuracion de las columnas en la DB
    type: DataType.STRING(100) // * Similar a VARCHAR
  }) // ! Decorador campo 2 de DB
    // @Default('') // * VALOR PRESENTE en caso de no añadir nada
    name: string  // * ESQUEMA

  @Column({
    type: DataType.FLOAT(6, 2)
  })
    price: number // * ESQUEMA

  @Default(true)
  @Column({
    type: DataType.BOOLEAN
  })
    availability: boolean // * ESQUEMA
}

export default Product