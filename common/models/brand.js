'use strict';

module.exports = function(Brand) {
  Brand.disableRemoteMethod('upsert', true);
  Brand.disableRemoteMethod('updateAll', true);

  Brand.disableRemoteMethod('__create__drinks', false);
  Brand.disableRemoteMethod('__destroyById__drinks', false);
  Brand.disableRemoteMethod('__findById__drinks', false);
  Brand.disableRemoteMethod('__updateById__drinks', false);

  Brand.disableRemoteMethod('replaceById', false);
  Brand.disableRemoteMethod('replaceOrCreate', true);
  Brand.disableRemoteMethod('upsertWithWhere', true);
  Brand.disableRemoteMethod('createChangeStream', true);
};
