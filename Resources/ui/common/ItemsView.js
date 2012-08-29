function ItemsView(_params) {
	var self = Ti.UI.createView({
		backgroundImage: '/iphone/listBg.png'
	});
	var engine = _params.engine;
	var categoryID = _params.categoryID;
	var itemsData = {};

	var tableData = [];
	
	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name + ': ' + e.data;
	});
	
	var table = Ti.UI.createTableView({
		top: '0dp',
		bottom: '0dp',
		data: tableData
	});
	table.backgroundColor = 'transparent';
	table.separatorStyle = Ti.UI.iPhone.TableViewSeparatorStyle.NONE;
	table.separatorColor = 'transparent';
	self.add(table);
	
	table.addEventListener('click', function(e) {
		
		if(e.source.itemID == -1){
	
		} else { 
			Ti.App.fireEvent('app:selectItem', {data: [e.source.itemID, itemsData[e.source.itemID]]});
		}
	});	
	
	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				itemID: _rowdata.iid,
				className: 'itemRowDp',
				height: '100dp'
		});
		newRow.backgroundColor = 'transparent';
	
		var bckView = Ti.UI.createView({left: '5dp', top: '5dp', right: '5dp', bottom: '0dp',
			backgroundColor: '#fff',
			itemID: _rowdata.iid,
			borderRadius: 5
		});
			
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			itemID: _rowdata.iid,			
			top: '10dp', left: '80dp', right: '10dp',
			bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);
		/*
		var annotationLabel = Ti.UI.createLabel({	
			font: {fontSize: '15dp', fontFamily: 'Arial'},
			color: "#555",
			top: '40dp', left: '90dp', right: '10dp', bottom: '10dp',
			text: _rowdata.annotation,
			itemID: _rowdata.iid
		});
		newRow.add(annotationLabel);
		*/
		var img = Ti.UI.createImageView({
			center: '50dp', left: '5dp',
			width: '70dp',
			itemID: _rowdata.iid,
			image: engine.getUrlStart() + '/' + _rowdata.img
		});
		img.defaultImage = '/iphone/applelogo.png';
		bckView.add(img);
		
		newRow.add(bckView);
		
		_data.push(newRow);
		itemsData[_rowdata.iid + ""] = _rowdata;
	};	

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};

	self.categoryCallback = function(data){
		self.clearTable();
		var tempData = []
		for(var i = 0; i < data.length; i++){
			self.addRowToTable(data[i], tempData);
		}
		table.setData(tempData);
	}	
	
	engine.getData('/shop/m/items/' + categoryID + '/', self.categoryCallback);
	
	return self;
};

module.exports = ItemsView;
