import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import { SANITY_MODULE } from "../modules/sanity"

defineLink(
    //The first data model part of the link. In this case, it's the Product Module's product data model. A module has a special linkable property that contain link configurations for its data models.
    {
        ...ProductModule.linkable.product.id,
        field: "id",
    },
    /*
    The second data model part of the link. Since the Sanity Module doesn't have a Medusa data model, you specify the configurations in a linkable object that has the following properties:
    serviceName: The registration name in the Medusa container of the service managing the data model, which in this case is the Sanity Module's name (since the module's service is registered under that name).
    alias: The name to refer to the model part of this link, such as when retrieving the Sanity document of a product. You'll use this in a later section.
    primaryKey: The name of the data model's primary key field.
*/
    {
        linkable: {
            serviceName: SANITY_MODULE,
            alias: "sanity_product",
            primaryKey: "id",
        }
    },
    /*
    An object of configurations for the module link. By default, Medusa creates a table in the database to 
    represent the link you define. Since the module link isn't created between two Medusa data models, you enable 
    the readOnly configuration, which will tell Medusa not to create a table in the database for this link.
    */
    {
        readOnly: true,
    }
)