import helper from '../../helper';
import Registry from '../../../registry';
import AddOrUpdateVariableHandler from '../addOrUpdateVariableHandler';

/** Handler that takes care of adding or updating variables for protractor. */
class ProtractorAddOrUpdateVariableHandler extends AddOrUpdateVariableHandler {
    /** @inheritDoc */
    handleAddOrUpdateVariable(registry: Registry, key: string, value: string, ngApimockId?: string): void {
        helper.protractor.addSessionIfNonExisting(registry, ngApimockId);
        registry.sessions[ngApimockId].variables[key] = value;
    }
}

export default ProtractorAddOrUpdateVariableHandler;
