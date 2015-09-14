var overiFrame = -1;
function mainSearch(obj, term, contentType) {
    var s = s_gi(s_account);

    if (contentType == "" || contentType == 0) {
        contentType = "All";
    } else if (contentType == 1) {
        contentType = "Commentary";
    } else if (contentType == 2) {
        contentType = "Events";
    } else if (contentType == 3) {
        contentType = "Experts";
    } else if (contentType == 4) {
        contentType = "Multimedia";
    } else if (contentType == 5) {
        contentType = "Books";
    } else if (contentType == 6) {
        contentType = "Testimony";
    } else if (contentType == 7) {
        contentType = "In The News";
    } else if (contentType == 8) {
        contentType = "Jobs and Internships";
    } else if (contentType == 9) {
        contentType = "Courses";
    }

    s.linkTrackVars = 'prop1,eVar1,prop6,eVar6,events';
    s.linkTrackEvents = 'event1';
    s.prop1 = s.eVar1 = term;
    s.prop6 = s.eVar6 = contentType;
    s.events = 'event1';
    s.tl(obj, 'o', 'main_search');
}

function advancedSearch(obj, term) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop5,eVar5,events';
    s.linkTrackEvents = 'event28';
    s.prop5 = s.eVar5 = term;
    s.events = 'event28';
    s.tl(obj, 'o', 'adv_search');
}

function videoSearch(obj, term) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop3,eVar3,events';
    s.linkTrackEvents = 'event26';
    s.prop3 = s.eVar3 = term;
    s.events = 'event26';
    s.tl(obj, 'o', 'video_search');
}

function expertSearch(obj, term) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop4,eVar4,events';
    s.linkTrackEvents = 'event27';
    s.prop4 = s.eVar4 = term;
    s.events = 'event27';
    s.tl(obj, 'o', 'expert_search');
}

function newsletterSub(obj, ids) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop9,eVar9,list2,events';
    s.linkTrackEvents = 'event5';
    s.prop9 = s.eVar9 = s.list2 = ids;
    s.events = 'event5';
    s.tl(obj, 'o', 'news_sub');
}

// Newsletter components tracking - right rail
function newsletterSubRR(obj, ids) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'eVar7,prop9,eVar9,list2,events';
    s.linkTrackEvents = 'event6';
    s.eVar7 = s.pageName;
    s.prop9 = s.eVar9 = s.list2 = ids;
    s.events = 'event6';
    s.tl(obj, 'o', 'news_sub');
   }

// Newsletter components tracking - modal
function newsletterSubModal(obj, ids) {
   	var s = s_gi(s_account);
   	s.linkTrackVars = 'eVar7,prop9,eVar9,list2,events';
   	s.linkTrackEvents = 'event7';
   	s.eVar7 = s.pageName;
   	s.prop9 = s.eVar9 = s.list2 = ids;
   	s.events = 'event7';
   	s.tl(obj, 'o', 'news_sub');
}

function audioPlay(obj) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'eVar7,events';
    s.linkTrackEvents = 'event60';
    s.eVar7 = s.pageName;
    s.events = 'event60';
    s.tl(obj, 'o', 'Audio_Play');
}

// SOMA Analytics
// Add this below the SOMA app's Flash embed code:
function somaAnalytics(data) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop8,eVar8,prop11,eVar11,events';
    s.prop8 = s.eVar8 = "State of Metropolitan America";
    s.prop11 = s.eVar11 = data.label;
    if (data.event === 'imageDownload') {
        // Image Download
        s.linkTrackEvents = s.events = 'event33';
        s.tl(true, 'd', 'interactive_image_download');
    } else if (data.event === 'dataDownload') {
            // Data Download
        s.linkTrackEvents = s.events = 'event34';
        s.tl(true, 'd', 'interactive_data_download');
    } else {
        // Indicator View
        s.linkTrackEvents = s.events = 'event30';
        s.tl(true, 'o', 'interactive_view');
    }
}
// Clean Economy Analytics
// Add this below the CE app's Flash embed code:
function ceAnalytics(data) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'prop8,eVar8,prop11,eVar11,events';
    s.prop8 = s.eVar8 = "Sizing the Clean Economy";
    s.prop11 = s.eVar11 = data.label;
    if (data.event === 'imageDownload') {
        // Image Download
        s.linkTrackEvents = s.events = 'event33';
        s.tl(true, 'd', 'interactive_image_download');
    } else if (data.event === 'dataDownload') {
            // Data Download
        s.linkTrackEvents = s.events = 'event34';
        s.tl(true, 'd', 'interactive_data_download');
    } else {
        // Indicator View
        s.linkTrackEvents = s.events = 'event30';
        s.tl(true, 'o', 'interactive_view');
    }
}

function triggerCustomLink(obj, linkTitle) {
    var s = s_gi(s_account);
    s.tl(obj, 'o', linkTitle);
}