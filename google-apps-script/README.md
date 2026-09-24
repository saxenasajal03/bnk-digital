# BNK Digital — Google Sheet Deduplication Engine Setup

This system connects your **BNK Digital** web application to a live Google Sheet and guarantees **STRICT ZERO DUPLICACY**: No two submissions from the same email will ever be accepted or appended.

---

## ⚡ 3-Minute Setup Guide

### 1. Create a Google Sheet
1. Go to [https://sheets.new](https://sheets.new)
2. Rename the document to **`BNK Digital - Leads Database`**
3. Rename the bottom sheet tab to **`BNK_Leads`**

### 2. Add the Apps Script Code
1. In Google Sheets top menu, click **Extensions** > **Apps Script**
2. Delete any boilerplate code in `Code.gs`
3. Copy all the code from [`google-apps-script/Code.gs`](file:///d:/Web/BNK/google-apps-script/Code.gs) (or click **Copy Apps Script Code** in the website's Leads Vault modal) and paste it into the editor
4. Click the **Save** disk icon (or press `Ctrl + S`)

### 3. Deploy as Web App
1. In the top-right corner of the Apps Script window, click the blue **Deploy** button > **New deployment**
2. Next to "Select type", click the gear icon ⚙️ and select **Web app**
3. Configure the settings:
   - **Description:** `BNK Digital Lead Sync`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` *(⚠️ Crucial: Must be set to "Anyone" so visitors can transmit inquiry data)*
4. Click **Deploy**
5. Click **Authorize access**, select your Google account, click **Advanced** > **Go to BNK Digital (unsafe)**, and click **Allow**
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

### 4. Connect to Your Website
1. Open your BNK Digital website
2. Click **`[ 🔐 Admin Leads Vault ]`** in the footer (or press `Ctrl + Shift + L`)
3. Click **Google Sheet Setup**
4. Paste your Web app URL into the input field and click **Save URL**

---

## 🛡️ How Deduplication is Enforced

1. **Client-Side Verification:**
   - When a user enters their email and submits, the system normalizes the email (`lowercase` + `trimmed`) and checks existing records.
   - If that email already exists, the submission is **blocked immediately**, and an explanatory notice is displayed prompting them to contact via WhatsApp instead.

2. **Server-Side Concurrency Lock in Google Apps Script:**
   - The script uses `LockService.getScriptLock()` with a 10-second queue to eliminate race conditions.
   - It searches the entire **Column C (Email Address)** of the spreadsheet.
   - If a duplicate email is found, insertion is **aborted**, and the row is NOT added.
   - Only genuinely unique leads are added to the sheet and dispatched to `hello.bnkdigital@gmail.com`.
