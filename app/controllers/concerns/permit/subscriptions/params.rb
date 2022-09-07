module ::Permit::Subscriptions::Params
  def voicerobot_create_params
    params.permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      opsms_attributes: %i[
        operator_id
        limit
        price
        _destroy
      ],
      jsondata: %i[
        auto_send_bill
        subscribe_price
        renewal
        comment
      ]
    )
  end

  def voicerobot_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.permit(
        :started_at,
        :ended_at,
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.permit(
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    end
  end

  def voicerobot_update_jsondata
    params.permit(
      jsondata: %i[
        auto_send_bill
        renewal
        comment
      ]
    )
  end

  def voicerobotkz_create_params
    params.permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      opsms_attributes: %i[
        operator_id
        limit
        price
        _destroy
      ],
      jsondata: %i[
        auto_send_bill
        subscribe_price
        renewal
        comment
      ]
    )
  end

  def voicerobotkz_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.permit(
        :started_at,
        :ended_at,
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.permit(
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    end
  end

  def voicerobotkz_update_jsondata
    params.permit(
      jsondata: %i[
        auto_send_bill
        renewal
        comment
      ]
    )
  end

  def sms_create_params
    params.permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      opsms_attributes: %i[
        operator_id
        limit
        price
        _destroy
      ],
      jsondata: %i[
        auto_send_bill
        subscribe_price
        renewal
        comment
        monthly_fee
        sms_login
      ]
    )
  end

  def sms_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.permit(
        :started_at,
        :ended_at,
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.permit(
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    end
  end

  def sms_update_jsondata
    params.permit(
      jsondata: %i[
        auto_send_bill
        renewal
        comment
        monthly_fee
        sms_login
      ]
    )
  end

  def smskz_create_params
    params.permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      opsms_attributes: %i[
        operator_id
        limit
        price
        _destroy
      ],
      jsondata: %i[
        auto_send_bill
        subscribe_price
        renewal
        comment
        monthly_fee
        sms_login
      ]
    )
  end

  def smskz_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.permit(
        :started_at,
        :ended_at,
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.permit(
        :credit_limit,
        opsms_attributes: %i[
          id
          operator_id
          limit
          price
          _destroy
        ]
      )
    end
  end

  def smskz_update_jsondata
    params.permit(
      jsondata: %i[
        auto_send_bill
        renewal
        comment
        monthly_fee
        sms_login
      ]
    )
  end

  def tehsupport_create_params
    params.require(:subscription).permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      jsondata: %i[
        auto_send_bill
        subscribe_price
        new_tariff
        new_tariff_hours
        new_tariff_slas
        renewal
        comment
      ]
    )
  end

  def tehsupport_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.require(:subscription).permit(
        :started_at,
        :ended_at,
        :credit_limit
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.require(:subscription).permit(
        :credit_limit
      )
    end
  end

  def tehsupport_update_jsondata
    params.require(:subscription).permit(
      jsondata: %i[auto_send_bill renewal comment]
    )
  end

  def tehsupportkz_create_params
    params.require(:subscription).permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      jsondata: %i[
        auto_send_bill
        subscribe_price
        new_tariff
        new_tariff_hours
        new_tariff_slas
        renewal
        comment
      ]
    )
  end

  def tehsupportkz_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.require(:subscription).permit(
        :started_at,
        :ended_at,
        :credit_limit
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.require(:subscription).permit(
        :credit_limit
      )
    end
  end

  def tehsupportkz_update_jsondata
    params.require(:subscription).permit(
      jsondata: %i[auto_send_bill renewal comment]
    )
  end

  def webcabins_create_params
    standard_create_params
  end

  def webcabins_update_params
    standard_update_params
  end

  def webcabins_update_jsondata
    standard_update_jsondata
  end

  def webcabinskz_create_params
    standard_create_params
  end

  def webcabinskz_update_params
    standard_update_params
  end

  def webcabinskz_update_jsondata
    standard_update_jsondata
  end

  def twogis_create_params
    standard_create_params
  end

  def twogis_update_params
    standard_update_params
  end

  def twogis_update_jsondata
    standard_update_jsondata
  end

  def complextm_create_params
    standard_create_params
  end

  def complextm_update_params
    standard_update_params
  end

  def complextm_update_jsondata
    standard_update_jsondata
  end

  def podrug_create_params
    standard_create_params
  end

  def podrug_update_params
    standard_update_params
  end

  def podrug_update_jsondata
    standard_update_jsondata
  end

  def podrugkz_create_params
    standard_create_params
  end

  def podrugkz_update_params
    standard_update_params
  end

  def podrugkz_update_jsondata
    standard_update_jsondata
  end

  def analitic_create_params
    standard_create_params
  end

  def analitic_update_params
    standard_update_params
  end

  def analitic_update_jsondata
    standard_update_jsondata
  end

  def analitickz_create_params
    standard_create_params
  end

  def analitickz_update_params
    standard_update_params
  end

  def analitickz_update_jsondata
    standard_update_jsondata
  end

  def taxophone_create_params
    standard_create_params
  end

  def taxophone_update_params
    standard_update_params
  end

  def taxophone_update_jsondata
    standard_update_jsondata
  end

  def taxophonekz_create_params
    standard_create_params
  end

  def taxophonekz_update_params
    standard_update_params
  end

  def taxophonekz_update_jsondata
    standard_update_jsondata
  end

  def involvedrivers_create_params
    standard_create_params
  end

  def involvedrivers_update_params
    standard_update_params
  end

  def involvedrivers_update_jsondata
    standard_update_jsondata
  end

  def accountios_create_params
    standard_create_params
  end

  def accountios_update_params
    standard_update_params
  end

  def accountios_update_jsondata
    standard_update_jsondata
  end

  def tmdrive_create_params
    standard_create_params
  end

  def tmdrive_update_params
    standard_update_params
  end

  def tmdrive_update_jsondata
    standard_update_jsondata
  end

  def tmdrivekz_create_params
    standard_create_params
  end

  def tmdrivekz_update_params
    standard_update_params
  end

  def tmdrivekz_update_jsondata
    standard_update_jsondata
  end

  def paymentgate_create_params
    standard_create_params
  end

  def paymentgate_update_params
    standard_update_params
  end

  def paymentgate_update_jsondata
    standard_update_jsondata
  end

  def paymentgatekz_create_params
    standard_create_params
  end

  def paymentgatekz_update_params
    standard_update_params
  end

  def paymentgatekz_update_jsondata
    standard_update_jsondata
  end

  def rentserver_create_params
    standard_create_params
  end

  def rentserver_update_params
    standard_update_params
  end

  def rentserver_update_jsondata
    standard_update_jsondata
  end

  def accelerator_create_params
    standard_create_params
  end

  def accelerator_update_params
    standard_update_params
  end

  def accelerator_update_jsondata
    standard_update_jsondata
  end

  def taxophonedistribution_create_params
    standard_create_params
  end

  def taxophonedistribution_update_params
    standard_update_params
  end

  def taxophonedistribution_update_jsondata
    standard_update_jsondata
  end

  def taxophonedistributionkz_create_params
    standard_create_params
  end

  def taxophonedistributionkz_update_params
    standard_update_params
  end

  def taxophonedistributionkz_update_jsondata
    standard_update_jsondata
  end

  def standard_create_params
    params.require(:subscription).permit(
      :client_id,
      :tariff_id,
      :credit_limit,
      :started_at,
      :ended_at,
      jsondata: %i[
        auto_send_bill
        comment
        renewal
        subscribe_price
      ]
    )
  end

  def standard_update_params
    case params[:state].to_sym
    when Subscription::STATE_NEW
      params.require(:subscription).permit(
        :started_at,
        :ended_at,
        :credit_limit
      )
    when Subscription::STATE_ACTIVE, Subscription::STATE_SUSPEND, Subscription::STATE_LIMITED
      params.require(:subscription).permit(
        :credit_limit
      )
    end
  end

  def standard_update_jsondata
    params.require(:subscription).permit(
      jsondata: %i[auto_send_bill renewal comment subscribe_price]
    )
  end
end
