/* Completare l’ esercizio iniziato a lezione sulla todo - list.
Utilizzare l’ API di esempio http://157.230.17.132:3007/todos
	e fare le 4 operazioni Create, Read, Update e Delete. */

// 1. Creo una to do list partendo dall'API http://157.230.17.132:3007/todos con il metodo GET a video tramite HB
// 2. Do la possibilità di cancellare con il metodo DELETE
// 3. Implemento il metodo POST per inserire altri elementi in lista
// 4. Metodo PUT (o PATCH) per modificare un elemento dalla lista



$(function () {

	$('#add-element').focus();

	// acquisisco la lista dall API
	getList();
	// rimozione elemento al click del tasto .delete-item
	$('#list').on('click', '.delete-item', deleteListItem);

	// aggiunta del testo al click di #add-element-btn
	$('#add-element-btn').click(addListItem);

	$('#add-element').keydown(function (e) {
		if (e.which == 13 && e.keyCode == 13) {
			addListItem();
		}

	});

	// rinomino un elemento al click di .item
	$('#list').on('click', '.item', renameListItem);

	function renameListItem() {

		$(this).toggle();
		$(this).next().toggle().focus();

		$('#list').on('keydown', '.change-element', function (e) {
			// valore acquisito da input
			let inputText = $(this).val();
			// id corrente
			let thisId = $(this).data('id');
			// show element al termine
			let $showElement = $(`.item[data-id="${thisId}"`);
			if (e.which == 13 && e.keyCode == 13 && inputText) {
				$(this).val('');
				$(this).toggle();
				$showElement.toggle();

				ajaxRenameCall(thisId, inputText);


				function ajaxRenameCall(id, newText) {
					$.ajax({
						url: `http://157.230.17.132:3007/todos/${id}`,
						method: 'PATCH',
						data: {
							text: newText
						},
						success: function () {

							getList();
						},
						error: function () {
							alert('errore');
						}
					})
				}
			}
		});
	}

});


function getList() {
	$('#list').html('');
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
		let context = element;
		let html = template(context);
		$('#list').append(html);
	});
}

function deleteListItem() {
	let id = $(this).parent().data('id');
	$.ajax({
		url: `http://157.230.17.132:3007/todos/${id}`,
		method: 'DELETE',
		success: function () {
			getList();
		},
		error: function () {
			alert('errore');
		}
	})
};

function addListItem() {

	let $addElement = $('#add-element').val();

	if ($addElement != '') {
		$('#add-element').val('');
		$.ajax({
			url: 'http://157.230.17.132:3007/todos',
			method: 'POST',
			data: {
				text: $addElement
			},
			success: function () {

				getList();
			},
			error: function () {
				alert('errore');
			}
		})
	}
}