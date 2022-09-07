{
  :ru => {
    :'i18n' => {
      :plural => {
        :rule => lambda { |n|
          if n % 10 == 1 && n % 100 != 11
            :one
          elsif [2, 3, 4].include?(n % 10) && ![12, 13, 14].include?(n % 100)
            :few
          elsif n % 10 == 0 || [5, 6, 7, 8, 9].include?(n % 10) || [11, 12, 13, 14].include?(n % 100)
            :many
          else
            :other
          end
        }
      }
    }
  }
}
