/* Completare l’ esercizio iniziato a lezione sulla todo - list.
Utilizzare l’ API di esempio http://157.230.17.132:3007/todos
	e fare le 4 operazioni Create, Read, Update e Delete. */

// 1. Creo una to do list partendo dall'API http://157.230.17.132:3007/todos con il metodo GET a video tramite HB
// 2. Do la possibilità di cancellare con il metodo DELETE
// 3. Implemento il metodo POST per inserire altri elementi in lista
// 4. Metodo PUT (o PATCH) per modificare un elemento dalla lista



$(function () {

	getList();

	$('#list').on('click', '.delete-item', deleteListItem);

	$('#add-element-btn').click(addListItem);



});


function getList() {
	$.ajax({
		url: 'http://157.230.17.132:3007/todos',
		method: 'GET',
		success: function (risposta) {
			printList(risposta);
		},
		error: function () {
			alert('errore');
		}
	})
}

function printList(data) {
	let source = $("#entry-template").html();
	let template = Handlebars.compile(source);
	data.forEach(element => {
		console.log(element);
		let context = element;
		let html = template(context);
		$('#list').prepend(html);
	});
}

function deleteListItem() {

	let $thisElement = $(this).parent().data('id');
	$.ajax({
		url: `http://157.230.17.132:3007/todos/${$thisElement}`,
		method: 'DELETE',
		success: function (risposta) {
			console.log(risposta);
			$('#list').html('');
			getList();
		},
		error: function () {
			alert('errore');
		}
	})
};

function addListItem() {
	let $addElement = $('#add-element').val();
	$('#add-element').val('');
	$.ajax({
		url: 'http://157.230.17.132:3007/todos',
		method: 'POST',
		data: {
			text: $addElement
		},
		success: function () {
			$('#list').html('');
			getList();
		},
		error: function () {
			alert('errore');
		}
	})
}