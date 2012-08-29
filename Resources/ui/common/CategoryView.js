function CategoryView(_params) {
	var self = Ti.UI.createView({
		backgroundImage: '/iphone/listBg.png'
	});
	var engine = _params.engine;
	var categoryID = _params.categoryID;
	var categoryData = {};

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
		
		if(e.source.categoryID == -1){
	
		} else { 
			Ti.App.fireEvent('app:selectCategory', {data: [e.source.categoryID, categoryData[e.source.categoryID]]});
		}
	});	
	
	self.addDescRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				categoryID: _rowdata.cid,
				className: 'categoryRowDesc',
				height: '135dp'
		});
		newRow.backgroundColor = 'transparent';

		var bckView = Ti.UI.createView({left: 5, top: 5, right: 5, bottom: 0,
				borderRadius: 5,
				backgroundColor: '#fff'
			});	
	
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			categoryID: _rowdata.cid,			
			top: '10dp', left: '10dp', right: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);

		var descriptionLabel = Ti.UI.createLabel({	
			font: {fontSize: '15dp', fontFamily: 'Arial'},
			color: "#555",
			top: '30dp', left: '10dp', right: '10dp', bottom: '10dp',
			text: _rowdata.description,
			categoryID: _rowdata.cid
		});
		bckView.add(descriptionLabel);
		
		newRow.add(bckView);	
			
		_data.push(newRow);
		categoryData[_rowdata.cid + ""] = _rowdata;
	};	

	self.addRowToTable = function(_rowdata, _data){
		var newRow = Ti.UI.createTableViewRow({
				categoryID: _rowdata.cid,
				className: 'categoryRowTitle',
				height: '50dp'
		});
		newRow.backgroundColor = 'transparent';
		newRow.selectedBackgroundColor = 'transparent';

		var bckView = Ti.UI.createView({left: 5, top: 5, right: 5, bottom: 0,
				borderRadius: 5,
				categoryID: _rowdata.cid,
				backgroundColor: '#fff'
			});		
	
		var titleLabel = Ti.UI.createLabel({
			text: _rowdata.cname,
			categoryID: _rowdata.cid,			
			top: '10dp', left: '10dp', right: '10dp', bottom: '10dp',
			font: {fontSize: '15dp', fontWeight: 'bold', fontFamily: 'Arial'},
			color: "#333"			
		});
		bckView.add(titleLabel);
		newRow.add(bckView);

		_data.push(newRow);
		categoryData[_rowdata.cid + ""] = _rowdata;
	};

	self.clearTable = function(){
		tableData = [];
		table.setData([]);		
	};

	self.categoryCallback = function(data){
		self.clearTable();
		var tempData = []
		for(var i = 0; i < data.length; i++){
			if(data[i].description == ''){
				self.addRowToTable(data[i], tempData);
			} else {
				self.addDescRowToTable(data[i], tempData);	
			}
			
		}
		table.setData(tempData);
	}	
	
	engine.getData('/shop/m/cat/' + categoryID + '/', self.categoryCallback);
	
	return self;
};

module.exports = CategoryView;
