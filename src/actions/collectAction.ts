/*
 * Copyright 2015-2016 Imply Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Indexer, Alterations } from '../expressions/baseExpression';
import { Action, ActionJS, ActionValue, AggregateAction } from './baseAction';
import { PlyType, DatasetFullType, FullType } from '../types';

export class CollectAction extends AggregateAction {
  static fromJS(parameters: ActionJS): CollectAction {
    return new CollectAction(Action.jsToValue(parameters));
  }

  constructor(parameters: ActionValue) {
    super(parameters, dummyObject);
    this._ensureAction("collect");
    this._checkExpressionTypes('STRING');
  }

  public getOutputType(inputType: PlyType): PlyType {
    this._checkInputTypes(inputType);
    return 'SET/STRING';
  }

  public _fillRefSubstitutions(typeContext: DatasetFullType, inputType: FullType, indexer: Indexer, alterations: Alterations): FullType {
    const { expression } = this;
    if (expression) {
      expression._fillRefSubstitutions(typeContext, indexer, alterations);
    }
    return {
      type: 'SET/STRING'
    };
  }
}

Action.register(CollectAction);