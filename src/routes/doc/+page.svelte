<script>
    import Header from '$lib/components/Header.svelte';
    import IdeFrame from '$lib/components/IdeFrame.svelte';
</script>
<Header />
<IdeFrame title="📘 Documentation" status={`04 Recommendations`}>
    <div class="h-[650px] overflow-y-auto">
    <h2 class="text-md font-bold mb-2 text-[#8f93a2]">Abstract</h2>
    <div class="rounded-xl border border-amber-900 p-5 mb-5 overflow-x-auto text-orange-400 text-sm bg-amber-950">
        The analysis of the ThinkerCareGroup contact form revealed several significant flaws that allow the submission of fraudulent messages, automated spam, and <span class="font-bold underline">public access to all data submitted by users</span>. These vulnerabilities directly expose the platform to risks of confidentiality breaches, system overload, and abuse.
    </div>  

    <h2 class="text-md font-bold mb-2 text-[#8f93a2]">Identified vulnerabilities</h2>
    <div class="rounded-xl border border-red-900 p-5 mb-5 overflow-x-auto text-red-400 text-sm bg-red-950">
        <ul>
            <li>
                <p class="font-bold">🚨 Form submitted without field validation</p>
                The form accepts the submission of empty data (fullname, email, phone, message).<br>
                <div class="text-xs text-red-600 font-bold mb-5 ">Risk: massive spam, data pollution, and loss of reliability in received messages.</div>  
            </li>
            <li>
                <p class="font-bold">🚨 No protection against multiple submissions</p>
                It is possible to submit the form several times in a row without any limitation.
                <div class="text-xs text-red-600 font-bold mb-5">Risk: flooding, service overload, exploitation by bots.</div>
            </li>
            <li>
                <p class="font-bold">🚨 No CAPTCHA</p>
                No anti-bot protection is present.
                <div class="text-sm text-red-600 font-bold mb-5">Risk: easy automation of sending thousands of messages through bots.</div>
            </li>
            <li>
                <p class="font-bold">🚨 Unsecured SheetDB API</p>
                The form directly sends data to:
                <a href="https://sheetdb.io/api/v1/5ivvxdan051gq" class="text-blue-400">https://sheetdb.io/api/v1/5ivvxdan051gq</a>
                <div class="text-xs text-red-600 font-bold mb-1">
                    Risk: The combination of an unvalidated form + open API + no CAPTCHA creates a major vulnerability that is easy to exploit and puts user confidentiality at risk.
                </div>
            </li>
        </ul>
    </div>
    
    <h2 class="text-md font-bold mb-2 text-[#8f93a2]"> Priority recommendations (Fixes)</h2>
    <div class="rounded-xl border border-green-900 p-5 mb-5 overflow-x-auto text-green-400 text-sm bg-green-950">
        <ul>
            <li>
                ✅ Disable public reading (GET) on SheetDB.
                <a href="https://docs.sheetdb.io/permissions" class="text-blue-400">https://docs.sheetdb.io/permissions</a>
            </li>
            <li>
                ✅ Enable authentication (Bearer token) for all operations.
                <a href="https://docs.sheetdb.io/authentication#bearer-token" class="text-blue-400">https://docs.sheetdb.io/authentication</a>
            </li>
            <li>✅ Implement server-side validation for required fields.</li>
            <li>✅ Add a CAPTCHA (hCaptcha or reCAPTCHA).</li>
        </ul>
    </div>
</div>
</IdeFrame> 