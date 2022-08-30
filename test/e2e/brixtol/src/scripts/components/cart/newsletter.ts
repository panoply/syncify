, m('form.mt-4', {
  method: 'get',
  action: 'https://api.brixtol.com/mail/subscribe',
  'accept-charset': 'UTF-8',
  'data-controller': 'form',
  'data-action': 'submit->form#onSubmit',
  'data-form-newsletter-value': 'true',
  'data-form-customer-locale-value': 'true'
}, [
  m('.cart__label', 'GET 10% OFF')
  , m(
    '.row.jc-between.ai-center.py-2.cart-newsletter'
    , [

      m('.col.cart-newsletter-form', [
        m('label.d-inline.mb-4[for="email"]', {
          'data-form-target': 'field'
        }, [
          m('input.bg-transparent[required]', {
            id: 'email',
            name: 'email',
            type: 'email',
            autocomplete: 'off',
            autocaplitalize: 'off',
            placeholder: 'Email Address',
            'data-action': 'input->form#onInput focusin->form#onFocus',
            'data-form-target': 'newsletterinput'
          })
        ]),
        m('button.btn-reset.btn-sm[disabled]', { 'data-form-target': 'submit' }, 'Subscribe'),
        m('output.text-center', { 'data-form-target': 'response' }),
        m('output.text-center.error', { 'data-form-target': 'error' })
      ])
    ]
  )
  , m(
    '.col-12.align-self-center.text-center.pt-2.cart__charity--info'
    , m(
      'span'
      , m.trust('Recieve 10% off of your order when you subscribe to our newsletter')
    )
  )
])
