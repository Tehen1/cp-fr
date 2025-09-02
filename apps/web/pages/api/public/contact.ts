import type { NextApiRequest, NextApiResponse } from 'next';

import sg from '@sendgrid/mail';

sg.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(

req: NextApiRequest,

res: NextApiResponse

) {

const { name, email, message } = JSON.parse(req.body);

await sg.send({

to: 'support@seobiz.be',

from: 'noreply@seobiz.be',

subject: `[LP contact] ${name}`,

text: `${message}\n\n${email}`,

});

res.status(200).end();

}
