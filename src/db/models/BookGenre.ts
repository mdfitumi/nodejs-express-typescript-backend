import * as Sequelize from "sequelize";
import { SEQUELIZE_MODEL_NAME_BOOK } from "./Book";
import { SEQUELIZE_MODEL_NAME_GENRE } from "./Genre";

const DB_TABLE_NAME = "book_genres";
const SEQUELIZE_MODEL_NAME = "BookGenre";

interface IAttributes {
  bookId?: number;
  genreId?: number;
}

type Instance = Sequelize.Instance<IAttributes> & IAttributes;

function createInstance(
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
) {
  /* tslint:disable */
  const attributes: Sequelize.DefineModelAttributes<IAttributes> = {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_BOOK,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SEQUELIZE_MODEL_NAME_GENRE,
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    }
  };
  /* tslint:enable */
  const options: Sequelize.DefineOptions<IAttributes> = {
    tableName: DB_TABLE_NAME
  };

  return sequelize.define<Instance, IAttributes>(
    SEQUELIZE_MODEL_NAME,
    attributes,
    options
  );
}

export { IAttributes as BookGenre };
export { Instance as BookGenreInstance };
export default function(sequelize: Sequelize.Sequelize) {
  return createInstance(sequelize, Sequelize);
}
