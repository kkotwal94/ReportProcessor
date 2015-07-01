# ReportProcessor
Making Reports and Processing them, and setting up reports for employees to fill out. Tree like user structure.


#Finished: 

Report Post Request, adding it into the DB

#Updates:
* Added alloyeditor (react rtf html editor)
* Added a subform form, and the choice of assigning it to your employees
* Added a FAQ, HELP
* Added a recursive function to find all relations
* Added a protected view so users can only see their view, whereas admin sees all forms
* Added a user submitted button, where onclick a user can set their form to complete or incomplete (does not affect subforms yet)


#ToDo:
* Need to display or predisplay info in edit box view
* Set all relational documents to complete or incomplete if main document has done so


#Summary

Tree dependencie relies on who works under which manager, get and post request for that is working.

Just need to show on users who get assigned the subform, in there view that they have this form to complete, 
therefore on Parent node, they must specify a title for that form for their children, and a due date. Secondly, 
a edit has to be available in the child view as well, also allowing them to assign subforms to their children (if any),
at completion of form, they will all be appended together in the order they were assigned.

Such as Master Form > sub1> sub1's childrens.... >sub2 > sub2's childrens.......

using jspdf will convert to pdf from html, the textarea im using is AlloyEditor, which allows me to convert the text into html, then jspdf allows me to convert html to pdf. Alloyeditor is built around CKeditor which takes images, ms word, and has alot other functionality http://ckeditor.com/. Check out alloyeditor too at http://alloyeditor.com/.

