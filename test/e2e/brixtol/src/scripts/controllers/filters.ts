import { Controller } from '@hotwired/stimulus';
import { Siema } from 'modules/siema';
import { IParamSchema } from 'types/export';
import m from 'mithril';
import { allTrue, has } from 'rambdax';
import { defineProperty, isArray } from 'utils/native';
import { MergeExclusive } from 'type-fest';
import * as pjax from 'spx';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Filter extends Controller {

  static params: IParamSchema = {
    'filter.p.m.specification.certificate': [],
    'filter.p.m.specification.fitting': [],
    'filter.p.product_type': [],
    'filter.p.vendor': [],
    'filter.v.availability': [],
    'filter.v.option.size': [],
    'filter.v.price.gte': NaN,
    'filter.v.price.lte': NaN,
    sort_by: null
  };

  /**
   * Stimulus Values
   */
  static values = {
    param: Array
  };

  /**
   * Stimulus Targets
   */
  static targets = [
    'checkbox'
  ];

  /**
   * Stimulus Initialize
   */
  initialize () {

  }

  /**
   * Stimulus Connect
   */
  connect () {

    const params = m.parseQueryString(window.location.search);

    for (const key in params) {
      if (isArray(Filter.params[key])) {
        console.log(params[key]);
        Filter.params[key] = (params[key] as string).split(',');
      } else {
        Filter.params[key] = params[key];
      }
    }

    for (const param of this.paramValue) {
      if (!has(param, Filter.params)) delete Filter.params[param];
    }

    Filter.params.sort_by = 'best-selling';

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

  }

  parseParams (params?: IParamSchema) {

    params = params || Filter.params;

    const qs = { ...params };

    for (const param in params) {
      if (isArray(qs[param])) {
        if (qs[param].length > 0) {
          qs[param] = qs[param].join(',');
        } else {
          delete qs[param];
        }
      } else if (isNaN(qs[param])) {
        delete qs[param];
      } else if (qs[param] === null) {
        delete qs[param];
      }
    }

    return decodeURIComponent(
      (
        window.location.pathname +
      '?' +
        m.buildQueryString(qs as m.Params)
      )
    );

  }

  queryParams (target: HTMLInputElement) {

    const {
      name,
      value,
      checked
    } = target as MergeExclusive<HTMLInputElement, {
      name: keyof IParamSchema;
      value: string;
      checked: boolean;
    }>;

    const param = Filter.params[name];
    const decode = decodeURIComponent(value);

    console.log(name, decode, checked);

    if (isArray(param)) {
      const index = param.indexOf(decode);
      if (checked) {
        if (index === -1) param.push(decode);
      } else {
        param.splice(index, 1);
      }
    }

    return this.parseParams();

  }

  cloneParams (target: HTMLInputElement) {

    const {
      name,
      value,
      checked
    } = target as MergeExclusive<HTMLInputElement, {
      name: keyof IParamSchema;
      value: string;
      checked: boolean;
    }>;

    const clone = { ...Filter.params };
    const param = clone[name];
    const decode = decodeURIComponent(value);

    console.log(name, decode, checked);

    if (isArray(param)) {
      const index = param.indexOf(decode);
      if (index === -1) param.push(decode);
    }

    return this.parseParams(clone);

  }

  onCheck (event: InputEvent) {

    if (event.target instanceof HTMLInputElement) {
      const visit = this.queryParams(event.target);
      return pjax.visit(visit + '&sort_by=best-selling');

    }

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Siema Instance
   */
  slider: Siema;
  /**
   * The interval timer
   */
  interval: number;
  /**
   * Stimulus: The carousel selector
   */
  siemaTarget: HTMLElement;
  /**
   * Stimulus: The carousel slide elements
   */
  slideTargets: HTMLElement[];
  /**
   * Stimulus: The shopify section id
   */
  idValue: string;
  /**
   * Stimulus: The autoplay interval
   */
  intervalValue: number;
  /**
   * Stimulus: The starting slide
   */
  startIndexValue: number;
  /**
   * Stimulus: Whether or not carousel is draggable
   */
  draggableValue: boolean;
  /**
   * Stimulus: Whether or not to loop slides
   */
  loopValue: boolean;
  /**
   * Stimulus: Whether or not to progressively load slides
   */
  hydrateValue: string;
  /**
   * Stimulus: Determine if `hydrate-value` exists
   */
  hasHydrateValue: boolean;
  /**
   * Stimulus: The animation slide duration
   */
  durationValue: number;
  /**
   * Stimulus: The amount of slides to show in desktop
   */
  desktopValue: number;
  /**
   * Stimulus: The amount of slides to show in mobile
   */
  tabletValue: number;
  /**
   * Stimulus: The amount of slides to show in mobile
   */
  mobileValue: number;

}
