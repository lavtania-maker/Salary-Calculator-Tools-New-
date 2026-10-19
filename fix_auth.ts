import fs from 'fs';
let html = fs.readFileSync('blog-admin.html', 'utf-8');

html = html.replace(
  '<div class="field-group">\n            <label>Email</label>\n            <input\n              id="lEmail"\n              type="email"\n              value="newadmin@salarycalculator.my"\n              required\n              autocomplete="email"\n            />\n          </div>\n          <div class="field-group">\n            <label>Password</label>\n            <input\n              id="lPass"\n              type="password"\n              value="password123"\n              placeholder="Enter your password"\n              required\n              autocomplete="current-password"\n            />\n          </div>\n          <button type="submit" id="loginBtn" class="btn btn-primary w-full">\n            Sign In\n          </button>',
  '<button type="button" id="googleLoginBtn" class="btn btn-primary w-full">\n            Sign In with Google\n          </button>'
);

// wait, the exact HTML might be slightly different. Let's use cheerio.
