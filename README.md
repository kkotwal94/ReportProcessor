# ReportProcessor
Making Reports and Processing them, and setting up reports for employees to fill out. Tree like user structure.


#Finished: 

Report Post Request, adding it into the DB

#ToDo:

-Add a edit report view, allowing users to review and edit their reports. 
-Add a subform button that allows the addition of subforms for that document, then becomes a tree like structure

     Master form
         / \
    sub1    sub2
    /\       /  \
..... and so on

Tree dependencie relies on who works under which manager, get and post request for that is working.

Just need to show on users who get assigned the subform, in there view that they have this form to complete, 
therefore on Parent node, they must specify a title for that form for their children, and a due date. Secondly, 
a edit has to be available in the child view as well, also allowing them to assign subforms to their children (if any),
at completion of form, they will all be appended together in the order they were assigned.

Such as Master Form > sub1> sub1's childrens.... >sub2 > sub2's childrens.......

using jspdf will convert to pdf from html, the textarea im using is CKEditor, which allows me to convert the text into html, then jspdf allows me to convert html to pdf. CKeditor takes images, ms word, and has alot other functionality http://ckeditor.com/



