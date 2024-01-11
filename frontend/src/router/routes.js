import deepMerge from "deepmerge"
import booksRoutes from "../modules/Books/routes"
import {routes as baseRoutes} from "../modules/Base/routes"

const routes = deepMerge.all([booksRoutes, baseRoutes])

export default routes