# How to Send an Email with Dynamic Templates

## Prerequisites

Before you begin, complete the following tasks:

* Create a Twilio SendGrid account
* Create an [API Key](/docs/sendgrid/ui/account-and-settings/api-keys/)
* Add an [unsubscribe group](/docs/sendgrid/ui/sending-email/group-unsubscribes/) (optional)

If you use your own templating system, you *can* insert dynamic data using [Substitution Tags][sub-tags].

[sub-tags]: /docs/sendgrid/ui/sending-email/substitution-and-section-tags

## Design a dynamic template

Twilio SendGrid allows multiple versions of a dynamic template. Each version might offer different content on the same theme. This splits the process for creating dynamic templates into creating the dynamic template and creating a version of that dynamic template.

### Create a dynamic template

As a component, a dynamic templates provides a unique ID to the Mail APIs.

1. Log in to the Twilio SendGrid app.
2. Go the [**Dynamic Templates**](https://sendgrid.com/dynamic_templates) page.
3. Click **Create a Dynamic Template**.
4. Type a human-readable name into the **Dynamic Template Name** field.
5. Click **Create**.
   * The **Dynamic Templates** page displyas your template in the **Template** list.
   * If you click the name of a dynamic template, a panel displays with the Template ID number, a list of template versions, and the **Add Version** button.

### Create a dynamic template version

To begin editing your created template, complete the following steps.

1. Log in to the Twilio SendGrid app.
2. Go the [**Dynamic Templates**](https://sendgrid.com/dynamic_templates) page.
3. Click the name of the template you want to design.\
   The details of the template display.
4. Click **Add Version**.
5. Click either the **Your Email Designs** or the **SendGrid Email Designs** tab.
6. Hover over the desired starting template and click **Select**.
7. To modify the starting template, click **Select** for either the **Design Editor** or **Code Editor**.
   * The **Design Editor** provides a visual interface for building email templates.
   * The **Code Editor** provides a text editor for modifying HTML code.
8. Complete the settings for this version:
   * Add a human-readable label for this version in the **Version Name** box.
   * Add a subject line for your email in the **Subject** box. This is optional. You can set a subject line when sending the email.
   * Add an extended preview of your email in the **Preheader** box. This is also optional and can be set when you send your email.
9. Click the **Build** tab.\
   The **Design Editor** provides three main features:
   * **Add Modules**: Drag and drop, then customize pre-built components into your email template.
   * **Global Styles**: Set the broad design of your email body and content container of your email template. These settings include:
     * Colors and fonts in the **Email Body** section, and
     * Width of the email content box and background color outside that box in the **Content Container** section.
   * **Advanced**: Import or export HTML and change the HTML head values.
10. Design your template.\
    You can include personalization variables into your dynamic template. Twilio SendGrid supports the [Handlebars templating language][hbjs] for the text, HTML, and subject lines of your template. Learn how to [use Handlebars](/docs/sendgrid/for-developers/sending-email/using-handlebars).
11. Include an unsubscribe module.
    1. Drag the **Unsubscribe** module into your email template.
    2. Change its formatting settings as needed.
    3. Choose which unsubscribe group should accept unsubscribes from this template in the **Unsubscribe Group** dropdown menu.
12. Whenever you want to save progress on your template, click **Save** in the top navigation.
13. When finished, click the left arrow icon in the top navigation.
14. Click the name of the template you last saved to open the version list for that template.
15. To set a specific version of the template as active, click **Make Active** from the three bullet icon at the right of the template.

To use sample templates, see the [`dynamic-template` directory in the Twilio SendGrid email-template GitHub repo][dyn-temp-gh-repo]. These samples include receipts, password resets, account activations, newsletters, and sale notifications.

[hbjs]: https://handlebarsjs.com

[Using Handlebars]: /docs/sendgrid/for-developers/sending-email/using-handlebars

[dyn-temp-gh-repo]: https://github.com/sendgrid/email-templates/tree/master/dynamic-templates

[receipt example template]: https://github.com/sendgrid/email-templates/tree/master/dynamic-templates/receipt

## Send a transactional email

To send mail using Dynamic Templates, use the [Mail Send REST API resource](/docs/sendgrid/for-developers/sending-email/api-getting-started). The API requests on this page use cURL with the [receipt example template][].

Add your dynamic content, the Handlebars variable values, to the `data` payload of your API request.

* The payload accepts a JSON document.
* Add the dynamic data that your template uses into the `dynamic_template_data` object. The previous example highlights those lines for you.
* Include the template ID for your dynamic template in the JSON body `data`.
  * The template ID starts with `d-` followed by 62 hexadecimal characters.
  * If you forget your template ID, find it in one of two ways:
    * Call the `templates` resource.

      #### Display the find all dynamic templates API

      ```bash
      # !focus(1)
      curl -X "GET" 'https://api.sendgrid.com/v3/templates?generations=dynamic' \
            -H 'Authorization: Bearer <<YOUR_API_KEY>>' \
            -H 'Content-Type: application/json'
      ```
    * Log in to Twilio SendGrid app then go to the [**Dynamic Templates**](https://sendgrid.com/dynamic_templates) page. Click the name of the template. The template ID displays under the template name.

```bash {title="Mail Send with Dynamic Template data example"}
# !mark(16:40)
curl -X "POST" "https://api.sendgrid.com/v3/mail/send" \
     -H 'Authorization: Bearer <<YOUR_API_KEY>>' \
     -H 'Content-Type: application/json' \
     -d '{
         "from":{
            "email":"example@.sendgrid.net"
         },
         "personalizations":[
            {
               "to":[
                  {
                     "email":"example@sendgrid.net"
                  }
               ],
               "dynamic_template_data":{
                  "total":"$ 239.85",
                  "items":[
                     {
                        "text":"New Line Sneakers",
                        "image":"https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
                        "price":"$ 79.95"
                     },
                     {
                        "text":"Old Line Sneakers",
                        "image":"https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
                        "price":"$ 79.95"
                     },
                     {
                        "text":"Blue Line Sneakers",
                        "image":"https://marketing-image-production.s3.amazonaws.com/uploads/00731ed18eff0ad5da890d876c456c3124a4e44cb48196533e9b95fb2b959b7194c2dc7637b788341d1ff4f88d1dc88e23f7e3704726d313c57f350911dd2bd0.png",
                        "price":"$ 79.95"
                     }
                  ],
                  "receipt":true,
                  "name":"Sample Name",
                  "address01":"1234 Fake St.",
                  "address02":"Apt. 123",
                  "city":"Place",
                  "state":"CO",
                  "zip":"80202"
               }
            }
         ],
         "template_id":"[template_id]"
}'
```

## Handlebars examples

Using the previous cURL command, you could customize your template in the following ways.

1. Insert the person's name.
   ```html
   <div>Hello {{name}}!</div>
   ```
2. Loop through the list of items ordered.
   ```html
   {{#list items}}
   {{image}} {{text}} {{price}}
   {{/list}}
   ```
3. Add a condition.
   ```html
   {{#if name}}
   <div>Hello {{name}}!</div>
   {{/if}}
   ```

The Handlebars variables point to JSON keys in your JSON payload.

## Additional resources

* [Mail Send with Dynamic Templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates)
* [Unsubscribe Groups](/docs/sendgrid/ui/sending-email/group-unsubscribes/)
* [Using Handlebars](/docs/sendgrid/for-developers/sending-email/using-handlebars/)
